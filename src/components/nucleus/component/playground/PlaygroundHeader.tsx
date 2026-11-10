import { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  Settings, 
  FileCode, 
  Sliders 
} from 'lucide-react';
import type { LanguageConfig, EditorSettings, EditorTheme } from '../../types/playground';
import { LanguageSelector } from './LanguageSelector';
import { TimerWidget } from './TimerWidget';
import './PlaygroundHeader.css';
import logo from '@/assets/logo.png';

export interface PlaygroundHeaderProps {
  selectedLanguage: LanguageConfig;
  onSelectLanguage: (language: LanguageConfig) => void;
  onResetCode: () => void;
  onRunCode: () => void;
  onRunTestCases: () => void;
  isRunning: boolean;
  settings: EditorSettings;
  onSettingsChange: (settings: EditorSettings) => void;
}

export function PlaygroundHeader({
  selectedLanguage,
  onSelectLanguage,
  onResetCode,
  onRunCode,
  onRunTestCases,
  isRunning,
  settings,
  onSettingsChange,
}: PlaygroundHeaderProps) {
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setShowSettingsModal(false);
      }
    };
    if (showSettingsModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettingsModal]);

  return (
    <header className="playground-header-container">
      {/* Left Section: Logo & Language Selector */}
      <div className="header-left-section">
        <div className="header-logo-group">
          <img src={logo} alt="Nucleus" className="header-logo-icon" />
          <div>
            <div className="header-brand-title">
              <span>NUCLEUS</span>
              <span className="header-brand-badge">Nucleus CP</span>
            </div>
          </div>
        </div>

        <div className="header-divider" />

        {/* 35+ Language Dropdown */}
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onSelectLanguage={onSelectLanguage}
        />

        {/* File Name Tag */}
        {selectedLanguage?.defaultFileName && (
          <div className="header-filename-tag">
            <FileCode size={14} color="#58a6ff" />
            <span>{selectedLanguage.defaultFileName}</span>
          </div>
        )}

        {/* Reset Template */}
        <button
          onClick={onResetCode}
          className="header-icon-btn"
          title="Reset to default language boilerplate"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Right Section: Timer, Settings, Run & Test Buttons */}
      <div className="header-right-section">
        {/* Practice Timer */}
        <TimerWidget />

        {/* Editor Settings Trigger */}
        <div className="settings-menu-wrapper" ref={settingsRef}>
          <button
            onClick={() => setShowSettingsModal((prev) => !prev)}
            className="header-icon-btn"
            title="Editor Settings"
            style={{ border: '1px solid #30363d' }}
          >
            <Settings size={16} />
          </button>

          {/* Settings Modal Dropdown */}
          {showSettingsModal && (
            <div className="settings-dropdown-menu">
              <div className="settings-menu-header">
                <Sliders size={14} color="#58a6ff" />
                <span>Editor Preferences</span>
              </div>

              {/* Font Size */}
              <div className="settings-item-row">
                <span className="settings-item-label">Font Size</span>
                <select
                  value={settings?.fontSize ?? 14}
                  onChange={(e) =>
                    onSettingsChange({ ...settings, fontSize: Number(e.target.value) })
                  }
                  className="settings-select-input"
                >
                  {[12, 13, 14, 15, 16, 18, 20].map((size) => (
                    <option key={size} value={size}>
                      {size}px
                    </option>
                  ))}
                </select>
              </div>

              {/* Tab Size */}
              <div className="settings-item-row">
                <span className="settings-item-label">Tab Indent</span>
                <select
                  value={settings?.tabSize ?? 4}
                  onChange={(e) =>
                    onSettingsChange({ ...settings, tabSize: Number(e.target.value) })
                  }
                  className="settings-select-input"
                >
                  <option value={2}>2 Spaces</option>
                  <option value={4}>4 Spaces</option>
                </select>
              </div>

              {/* Theme */}
              <div className="settings-item-row">
                <span className="settings-item-label">Theme</span>
                <select
                  value={settings?.theme ?? 'nucleus-dark'}
                  onChange={(e) =>
                    onSettingsChange({ 
                      ...settings, 
                      theme: e.target.value as EditorTheme 
                    })
                  }
                  className="settings-select-input"
                >
                  <option value="nucleus-dark">Nucleus Dark</option>
                  <option value="vs-dark">VS Dark</option>
                  <option value="hc-black">High Contrast</option>
                  <option value="light">Light</option>
                </select>
              </div>

              {/* Minimap */}
              <div className="settings-item-row">
                <span className="settings-item-label">Minimap</span>
                <input
                  type="checkbox"
                  checked={settings?.minimap ?? true}
                  onChange={(e) =>
                    onSettingsChange({ ...settings, minimap: e.target.checked })
                  }
                  className="settings-checkbox"
                />
              </div>
            </div>
          )}
        </div>

        {/* Run Code Button */}
        <button
          onClick={onRunCode}
          disabled={isRunning}
          className="btn-run-code"
          title="Run Code (Ctrl + Enter)"
        >
          {isRunning ? (
            <div className="btn-spinner" />
          ) : (
            <Play size={14} fill="currentColor" />
          )}
          <span>Run</span>
          <kbd className="btn-keyboard-shortcut">Ctrl+↵</kbd>
        </button>

        {/* Run Test Cases / Submit */}
        <button
          onClick={onRunTestCases}
          disabled={isRunning}
          className="btn-test-cases"
          title="Run All Test Cases"
        >
          <CheckCircle2 size={14} />
          <span>Test Cases</span>
        </button>
      </div>
    </header>
  );
}

export default PlaygroundHeader;