import { useState } from 'react';
import {
  VscChevronUp,
  VscFilter,
  VscCopy,
  VscListSelection,
  VscClose,
  VscBroadcast,
  VscPlug,
  VscBell,
  VscLayout,
} from 'react-icons/vsc';
import './BottomEditor.css';

type BottomTab = 'problems' | 'output' | 'debug-console' | 'terminal' | 'ports';

export function Bottom() {
  const [bottomTab, setBottomTab] = useState<BottomTab>('problems');

  return (
    <div className="bottom-editor">
      <div className="bottom-editor-tabs">
        <div className="bottom-editor-tabs-left">
          <button
            className={bottomTab === 'problems' ? 'active' : ''}
            onClick={() => setBottomTab('problems')}
          >
            Problems
          </button>
          <button
            className={bottomTab === 'output' ? 'active' : ''}
            onClick={() => setBottomTab('output')}
          >
            Output
          </button>
          <button
            className={bottomTab === 'debug-console' ? 'active' : ''}
            onClick={() => setBottomTab('debug-console')}
          >
            Debug Console
          </button>
          <button
            className={bottomTab === 'terminal' ? 'active' : ''}
            onClick={() => setBottomTab('terminal')}
          >
            Terminal
          </button>
          <button
            className={bottomTab === 'ports' ? 'active' : ''}
            onClick={() => setBottomTab('ports')}
          >
            Ports <span className="bottom-editor-ports-count">2</span>
          </button>
        </div>

        <div className="bottom-editor-actions">
          <div className="bottom-editor-filter-box">
            <input type="text" placeholder="Filter (e.g. text, **/*.ts, !**/node_modules/**)" />
            <VscFilter size={14} />
          </div>
          <VscCopy size={16} />
          <VscListSelection size={16} />
          <VscChevronUp size={16} />
          <VscClose size={16} />
        </div>
      </div>

      <div className="bottom-editor-content">
        {bottomTab === 'problems' && (
          <div className="bottom-editor-panel-message">No problems have been detected in the workspace.</div>
        )}
        {bottomTab !== 'problems' && (
          <div className="bottom-editor-panel-message">Nothing to show here yet.</div>
        )}
      </div>

      <div className="bottom-editor-strip">
        <div className="bottom-editor-strip-left">
          <span className="bottom-editor-strip-item">
            <VscBroadcast size={13} /> 2
          </span>
        </div>
        <div className="bottom-editor-strip-right">
          <span className="bottom-editor-strip-item">
            <VscPlug size={13} /> Port: 3000
          </span>
          <span className="bottom-editor-strip-item">
            <VscLayout size={13} /> Layout: US
          </span>
          <VscBell size={13} className="bottom-editor-strip-icon" />
        </div>
      </div>
    </div>
  );
}