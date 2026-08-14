import { useState, useEffect, useCallback } from 'react';
import { TemplateCard } from '../dashboard/TemplateCard';
import { getTemplates } from '../../api/templateApi';
import type { TemplateCardProps, TemplatesGalleryProps } from '../types/template';
import './Templatesgallary.css';

const CATEGORIES = ['Popular', 'Browser', 'Server', 'Frontend', 'Backend', 'Workspace'];

export function TemplatesGallery({ onBack, initialCategory = 'Popular' }: TemplatesGalleryProps) {
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
  new Set([initialCategory]));
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [templates, setTemplates] = useState<TemplateCardProps[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTemplates({
        categories: Array.from(activeCategories),
        search: searchQuery || undefined,
      });
      setTemplates(response.templates);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load templates.');
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  }, [activeCategories, searchQuery]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTemplates();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [fetchTemplates]);

  const handleTemplateClick = (id: string) => {
    setSelectedId(id);
  };

  const toggleCategory = (cat: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next.size === 0 ? new Set(['Popular']) : next;
    });
  };

  return (
    <div className="tg-wrapper">
      {onBack && (
        <button className="tg-back-btn" onClick={onBack}>
          <i className="fas fa-arrow-left"></i> Back to recent
        </button>
      )}

      <div className="tg-header">
        <h2>Recent</h2>
        <div className="tg-actions">
          <button className="tg-btn-primary">Explore templates</button>
          <button className="tg-btn-secondary">+ Create new</button>
        </div>
      </div>

      <div className="tg-glass">
        <h3>Create</h3>

        
        <div className="tg-categories">
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className={`tg-pill ${activeCategories.has(cat) ? 'active' : ''}`}
              onClick={() => toggleCategory(cat)}
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="tg-search">
          <input
            type="text"
            placeholder="Search templates"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fas fa-search search-icon"></i>
        </div>

        <div className="tg-popular-header">
          <h4><i className="fas fa-fire"></i> {Array.from(activeCategories).join(', ')}</h4>
          <span>{loading ? 'Loading…' : `${total} templates`}</span>
        </div>

        {error && (
          <div className="tg-error" role="alert">
            {error}
            <button className="tg-retry-btn" onClick={fetchTemplates}>Retry</button>
          </div>
        )}

        {loading && !error && (
          <div className="tg-loading">Loading templates…</div>
        )}

        {!loading && !error && templates.length === 0 && (
          <div className="tg-empty">No templates match your search.</div>
        )}

        {!loading && !error && templates.length > 0 && (
          <div className="tg-grid">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                {...template}
                isSelected={selectedId === template.id}
                onClick={handleTemplateClick}
              />
            ))}
          </div>
        )}

        <div className="tg-footer">
          <span><i className="far fa-clock"></i>New usage</span>
          <span><i className="fas fa-circle dot-green"></i>All templates ready</span>
        </div>
      </div>
    </div>
  );
}