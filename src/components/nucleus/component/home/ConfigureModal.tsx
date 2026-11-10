import { useState } from 'react';
import type { TemplateCardProps, CreateFromTemplateParams } from '../../types/template';
import './ConfigureModal.css';
import { useAuth } from '../../hooks/useAuth';

type CreateConfig = Omit<CreateFromTemplateParams, 'templateId'>;

interface ConfigureModalProps {
  template: TemplateCardProps;
  onBack: () => void;
  onClose: () => void;
  onCreate: (config: CreateConfig) => void;
}

const ADJECTIVES = ['lively', 'quiet', 'brave', 'calm', 'bold', 'swift'];
const NOUNS = ['bash', 'river', 'ember', 'cedar', 'orbit', 'delta'];

function randomName() {
  const a = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const n = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${a}-${n}`;
}

export function ConfigureModal({ template, onBack, onClose, onCreate }: ConfigureModalProps) {
  const { user } = useAuth();
  const displayName = user?.name ?? 'User';
  const [name, setName] = useState(randomName());
  const [visibility, setVisibility] = useState<CreateConfig['visibility']>('private');
  const [folder, setFolder] = useState('drafts');
  const [runtime, setRuntime] = useState<CreateConfig['runtime']>('devbox');
  const [vmSpec, setVmSpec] = useState('nano');
  const [openIn, setOpenIn] = useState('vscode-web');

  const sandboxAvailable = template.categories.includes('Browser');

  const handleCreate = () => {
    onCreate({ name, visibility, folder, runtime, vmSpec, openIn });
  };

  return (
    <div className="cm-overlay" onClick={onClose}>
      <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cm-close" onClick={onClose} aria-label="Close">
          <i className="fas fa-times"></i>
        </button>

        <div className="cm-body">
          <div className="cm-left">
            <button className="cm-back" onClick={onBack} aria-label="Back">
              <i className="fas fa-arrow-left"></i>
            </button>

            <div className="cm-icon" style={template.color ? { color: template.color } : undefined}>
              <span>{template.icon}</span>
            </div>

            <h3 className="cm-name">{template.name}</h3>
            <p className="cm-author">{template.author}</p>

            <div className="cm-categories">
              {template.categories.map((cat) => (
                <span key={cat} className="cm-category-pill">{cat}</span>
              ))}
            </div>

            {template.price && <p className="cm-price">{template.price}</p>}
          </div>

          <div className="cm-right">
            <h2>Configure</h2>

            <label className="cm-label">Name</label>
            <input
              className="cm-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="cm-row">
              <div className="cm-field">
                <label className="cm-label">Visibility</label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value as CreateConfig['visibility'])}
                >
                  <option value="private">Private (only workspace members have access)</option>
                  <option value="public">Public</option>
                </select>
              </div>
              <div className="cm-field">
                <label className="cm-label">Folder</label>
                <select value={folder} onChange={(e) => setFolder(e.target.value)}>
                  <option value="drafts">Drafts</option>
                  <option value="root">Root</option>
                </select>
              </div>
            </div>

            <label className="cm-label">Runtime</label>
            <div className="cm-runtime-row">
              <button
                type="button"
                className={`cm-runtime-card ${runtime === 'sandbox' ? 'active' : ''} ${!sandboxAvailable ? 'disabled' : ''}`}
                disabled={!sandboxAvailable}
                onClick={() => setRuntime('sandbox')}
              >
                <div className="cm-runtime-title"><i className="fas fa-cube"></i> Sandbox</div>
                <p>Ideal for prototyping and sharing code snippets. Runs on the browser.</p>
                {!sandboxAvailable && <p className="cm-warn">Not available for this template.</p>}
              </button>

              <button
                type="button"
                className={`cm-runtime-card ${runtime === 'devbox' ? 'active' : ''}`}
                onClick={() => setRuntime('devbox')}
              >
                <div className="cm-runtime-title"><i className="fas fa-server"></i> Devbox</div>
                <p>Ideal for any type of project, language or size. Runs on a server.</p>
              </button>
            </div>

            <label className="cm-label">VM specs</label>
            <select className="cm-input" value={vmSpec} onChange={(e) => setVmSpec(e.target.value)}>
              <option value="nano">Nano (2 vCPUs, 4 GiB RAM, 30 GB Disk for 10 credits/hour)</option>
              <option value="micro">Micro (4 vCPUs, 8 GiB RAM, 30 GB Disk for 20 credits/hour)</option>
            </select>

            <label className="cm-label">Open in</label>
            <select className="cm-input" value={openIn} onChange={(e) => setOpenIn(e.target.value)}>
              <option value="vscode-web">VS Code for the web (CodeSandbox.io)</option>
              <option value="vscode-desktop">VS Code Desktop</option>
            </select>
          </div>
        </div>

        <div className="cm-footer">
          <button className="cm-user-btn">
            {displayName} <i className="fas fa-chevron-down"></i>
          </button>
          <div className="cm-footer-actions">
            <button className="cm-btn-secondary" onClick={onClose}>Cancel</button>
            <button className="cm-btn-primary" onClick={handleCreate}>
              Create {runtime === 'devbox' ? 'Devbox' : 'Sandbox'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}