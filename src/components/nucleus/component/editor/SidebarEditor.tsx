import { useState } from 'react';
import {
  VscMenu,
  VscFiles,
  VscSearch,
  VscDebugAlt,
  VscRunAll,
  VscExtensions,
  VscGithub,
  VscAccount,
  VscSettingsGear,
  VscChevronRight,
  VscChevronDown,
  VscEllipsis,
  VscGitMerge,
} from 'react-icons/vsc';
import type { ProjectDto } from '../../types/template';
import './SidebarEditor.css';


type ActivityView = 'explorer' | 'search' | 'debug' | 'source-control' | 'run' | 'extensions';

interface SidebarEditorProps {
  project: ProjectDto;
}

interface ExplorerSection {
  id: string;
  label: string;
}

const EXPLORER_SECTIONS: ExplorerSection[] = [
  { id: 'devbox-info', label: 'Devbox Info' },
  { id: 'workspace', label: 'Workspace' },
  { id: 'dependencies', label: 'Dependencies' },
  { id: 'outline', label: 'Outline' },
  { id: 'timeline', label: 'Timeline' },
];

export function Sidebar({ project }: SidebarEditorProps) {
  const [activeView, setActiveView] = useState<ActivityView>('explorer');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  function toggleSection(id: string) {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <>
      
      <div className="sidebar-editor-activitybar">
        <button className="sidebar-editor-menu-btn" aria-label="Menu">
          <VscMenu size={20} />
        </button>

        <div className="sidebar-editor-activitybar-top">
          <button
            className={`sidebar-editor-activity-icon ${activeView === 'explorer' ? 'active' : ''}`}
            onClick={() => setActiveView('explorer')}
            aria-label="Explorer"
          >
            <VscFiles size={22} />
          </button>
          <button
            className={`sidebar-editor-activity-icon ${activeView === 'search' ? 'active' : ''}`}
            onClick={() => setActiveView('search')}
            aria-label="Search"
          >
            <VscSearch size={22} />
          </button>
          <button
            className={`sidebar-editor-activity-icon ${activeView === 'debug' ? 'active' : ''}`}
            onClick={() => setActiveView('debug')}
            aria-label="Run and Debug"
          >
            <VscDebugAlt size={22} />
            <span className="sidebar-editor-activity-badge">1</span>
          </button>
          <button
            className={`sidebar-editor-activity-icon ${activeView === 'source-control' ? 'active' : ''}`}
            onClick={() => setActiveView('source-control')}
            aria-label="Source Control Graph"
          >
            <VscGitMerge size={22} />
          </button>
          <button
            className={`sidebar-editor-activity-icon ${activeView === 'run' ? 'active' : ''}`}
            onClick={() => setActiveView('run')}
            aria-label="Run"
          >
            <VscRunAll size={22} />
          </button>
          <button
            className={`sidebar-editor-activity-icon ${activeView === 'extensions' ? 'active' : ''}`}
            onClick={() => setActiveView('extensions')}
            aria-label="Extensions"
          >
            <VscExtensions size={22} />
          </button>
          <button className="sidebar-editor-activity-icon" aria-label="GitHub">
            <VscGithub size={22} />
          </button>
          <button className="sidebar-editor-activity-icon" aria-label="GitHub Pull Requests">
            <VscGithub size={22} />
          </button>
        </div>

        <div className="sidebar-editor-activitybar-bottom">
          <button className="sidebar-editor-activity-icon" aria-label="Account">
            <VscAccount size={22} />
            <span className="sidebar-editor-activity-badge">1</span>
          </button>
          <button className="sidebar-editor-activity-icon" aria-label="Settings">
            <VscSettingsGear size={22} />
          </button>
        </div>
      </div>

      
      <div className="sidebar-editor-explorer">
        <div className="sidebar-editor-explorer-header">
          <span>Explorer</span>
          <VscEllipsis size={16} />
        </div>
        <div className="sidebar-editor-explorer-tree">
          {EXPLORER_SECTIONS.map((section) => (
            <div key={section.id}>
              <button
                className="sidebar-editor-tree-section-label"
                onClick={() => toggleSection(section.id)}
              >
                {expandedSections.has(section.id) ? (
                  <VscChevronDown size={14} />
                ) : (
                  <VscChevronRight size={14} />
                )}
                {section.label.toUpperCase()}
              </button>

              
              {expandedSections.has(section.id) && section.id === 'devbox-info' && (
                <div className="sidebar-editor-tree-item">
                  <span>{project.name ?? 'Untitled project'}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}