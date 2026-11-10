import type { ProjectDto } from '../../types/template';
import './CentreEditor.css';

interface CentreEditorProps {
  project: ProjectDto;
}

export function Centre({ project }: CentreEditorProps) {
  return (
    <div className="centre-editor">
      <div className="centre-editor-grid-bg">
        <svg viewBox="0 0 120 70" className="centre-editor-diamond">
          <path
            d="M60 10 L100 35 L60 60 L20 35 Z"
            fill="none"
            stroke="#4a4a4a"
            strokeWidth="2"
          />
        </svg>
      </div>
      <p className="centre-editor-project-label">{project.name}</p>
    </div>
  );
}