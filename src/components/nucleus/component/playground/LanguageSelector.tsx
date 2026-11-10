import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, Check, Code2, Sparkles, ChevronDown } from 'lucide-react';
import type { LanguageConfig, LanguageCategory } from '../../types/playground';
import { SUPPORTED_LANGUAGES, CATEGORY_LABELS } from '../../language/language';
import './LanguageSelector.css';

export interface LanguageSelectorProps {
  selectedLanguage: LanguageConfig;
  onSelectLanguage: (language: LanguageConfig) => void;
}

const CATEGORIES: LanguageCategory[] = [
  'all',
  'popular',
  'systems',
  'jvm',
  'web',
  'functional',
  'scripting',
  'legacy',
];

export function LanguageSelector({
  selectedLanguage,
  onSelectLanguage,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<LanguageCategory>('all');
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 40);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Filter languages by query and active category
  const filteredLanguages = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return SUPPORTED_LANGUAGES.filter((lang) => {
      const matchesSearch =
        !query ||
        lang.name.toLowerCase().includes(query) ||
        lang.id.toLowerCase().includes(query) ||
        lang.version.toLowerCase().includes(query) ||
        lang.defaultFileName.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'popular' && lang.category === 'popular') ||
        lang.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleOpen = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setIsOpen(true);
  };

  return (
    <div className="lang-selector-container" ref={dropdownRef}>
      {/* Selector Trigger Button */}
      <button
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        className="lang-trigger-btn"
        title="Choose language"
      >
        <span
          className="lang-color-dot"
          style={{ backgroundColor: selectedLanguage?.iconColor || '#58A6FF' }}
        />
        <span>{selectedLanguage?.name || 'Select Language'}</span>
        {selectedLanguage?.defaultFileName && (
          <span className="lang-file-badge">
            ({selectedLanguage.defaultFileName})
          </span>
        )}
        <ChevronDown 
          size={14} 
          className={`lang-chevron-icon ${isOpen ? 'open' : ''}`} 
        />
      </button>

      {/* Dropdown Modal */}
      {isOpen && (
        <div className="lang-dropdown-modal">
          {/* Header & Search Input */}
          <div className="lang-modal-header">
            <div className="lang-modal-title-row">
              <div className="lang-modal-title">
                <Code2 size={16} color="#58a6ff" />
                <span>Select Language ({SUPPORTED_LANGUAGES.length} Available)</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="lang-close-btn"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="lang-search-wrapper">
              <Search size={14} className="lang-search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, version, or file (e.g. C++, Java, Rust)..."
                className="lang-search-input"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="lang-categories-row">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`lang-category-chip ${selectedCategory === cat ? 'active' : ''}`}
                >
                  {cat === 'all' ? 'All (35+)' : CATEGORY_LABELS[cat]?.split(' ')[0] || cat}
                </button>
              ))}
            </div>
          </div>

          {/* Languages List */}
          <div className="lang-list-container">
            {filteredLanguages.length === 0 ? (
              <div className="lang-empty-state">
                No programming language matching "{searchQuery}"
              </div>
            ) : (
              filteredLanguages.map((lang) => {
                const isSelected = selectedLanguage?.id === lang.id;
                return (
                  <button
                    key={lang.id}
                    onClick={() => {
                      onSelectLanguage(lang);
                      setIsOpen(false);
                    }}
                    className={`lang-item-btn ${isSelected ? 'selected' : ''}`}
                  >
                    <div className="lang-item-left">
                      <span
                        className="lang-color-dot"
                        style={{ backgroundColor: lang.iconColor || '#8B949E' }}
                      />
                      <div className="lang-item-info">
                        <div className="lang-item-name-row">
                          <span className="lang-item-name">{lang.name}</span>
                          {lang.category === 'popular' && (
                            <span className="lang-popular-badge">
                              <Sparkles size={10} /> Popular
                            </span>
                          )}
                        </div>
                        <div className="lang-item-meta">
                          <span>{lang.version}</span>
                          <span>•</span>
                          <span className="lang-file-text">{lang.defaultFileName}</span>
                        </div>
                      </div>
                    </div>

                    {isSelected && <Check size={16} color="#58a6ff" />}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="lang-modal-footer">
            <span>Includes fast I/O competitive templates</span>
            <span>{filteredLanguages.length} languages</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;