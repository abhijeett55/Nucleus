import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditorPage.css';
import { Header } from '../../component/editor/HeaderEditor';
import { Sidebar } from '../../component/editor/SidebarEditor';
import { Centre } from '../../component/editor/CentreEditor';
import { Bottom} from '../../component/editor/BottomEditor';
import { getProjectById } from '../../api/projectApi';
import type { ProjectDto } from '../../types/template';
import './EditorPage.css';

export function EditorPage() {
  const { projectId } = useParams<{ projectId: string }>();

  const [project, setProject] = useState<ProjectDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError('No project ID in the URL.');
      setLoading(false);
      return;
    }

    let cancelled = false;

    setLoading(true);
    setError(null);

    getProjectById(projectId)
      .then((data) => {
        if (!cancelled) setProject(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Could not load this project.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [projectId]);

  if (loading) {
    return (
      <div className="editor-page-status">
        <p>Loading project…</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="editor-page-status">
        <p>{error ?? 'Project not found.'}</p>
      </div>
    );
  }

  return (
    <div className="editor-page">
      <Header project={project} />
      <div className="editor-page-body">
        <Sidebar project={project} />
        <div className="editor-page-center-column">
          <Centre project={project} />
          <Bottom />
        </div>
      </div>
    </div>
  );
}
