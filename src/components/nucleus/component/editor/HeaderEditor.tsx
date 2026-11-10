import { VscChevronRight, VscChevronDown, VscLock } from 'react-icons/vsc';
import type { ProjectDto } from '../../types/template';
import './HeaderEditor.css';

interface HeaderEditorProps {
  project: ProjectDto;
}

export function Header({ project }: HeaderEditorProps) {
  
  const ownerUsername = project.ownerId ?? 'you';
  const folderName = project.folder ?? 'Drafts';
  const projectName = project.name ?? 'untitled';

  return (
    <div className="header-editor">
      <div className="header-editor-left">
        <button className="header-editor-window-btn" aria-label="Menu">
          <span className="header-editor-window-square" />
          <VscChevronDown size={12} />
        </button>
        <span className="header-editor-update-pill">
          CodeSandbox was updated! <VscChevronRight size={12} />
        </span>
        <span className="header-editor-feedback-pill">
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M2 3h12v7H6l-3 3V10H2V3z" strokeLinejoin="round" />
          </svg>
          Feedback
        </span>
      </div>

      <div className="header-editor-center">
        <span className="header-editor-devbox-badge">
          <svg viewBox="0 0 16 16" width="11" height="11" fill="currentColor">
            <rect x="2" y="6" width="12" height="8" rx="1" />
            <path d="M4 6V4a4 4 0 0 1 8 0v2" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          Devbox
        </span>
        <span className="header-editor-breadcrumb">
          {ownerUsername} / {folderName} / {projectName}
          <VscChevronDown size={12} />
        </span>
      </div>

      <div className="header-editor-right">
        <div className="header-editor-avatar" aria-hidden="true" />
        <button className="header-editor-share-btn">
          <VscLock size={12} /> Share
        </button>
        <button className="header-editor-fork-btn">
          Fork <VscChevronDown size={12} />
        </button>
      </div>
    </div>
  );
}