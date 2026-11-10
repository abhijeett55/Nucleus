import { useState } from 'react';
import { 
  Terminal, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Cpu, 
  FileCode2, 
  Copy, 
  Check 
} from 'lucide-react';
import type { 
  ExecuteResponse, 
  TestCase, 
  BatchExecutionResponse 
} from '../../types/playground';
import { TestCaseManager } from './TestCaseManager';
import './InputOutputPanel.css';

export interface InputOutputPanelProps {
  customInput: string;
  onCustomInputChange: (val: string) => void;
  outputResult: ExecuteResponse | null;
  batchResult: BatchExecutionResponse | null;
  testCases: TestCase[];
  onTestCasesChange: (testCases: TestCase[]) => void;
  isRunning: boolean;
}

export function InputOutputPanel({
  customInput,
  onCustomInputChange,
  outputResult,
  batchResult,
  testCases,
  onTestCasesChange,
  isRunning,
}: InputOutputPanelProps) {
  const [activeTab, setActiveTab] = useState<'testcases' | 'stdin' | 'output'>('output');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyOutput = () => {
    if (outputResult?.stdout) {
      navigator.clipboard.writeText(outputResult.stdout);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderStatusBadge = (status?: string) => {
    switch (status) {
      case 'ACCEPTED':
        return (
          <span className="io-status-badge badge-accepted">
            <CheckCircle2 size={14} /> Accepted
          </span>
        );
      case 'WRONG_ANSWER':
        return (
          <span className="io-status-badge badge-wrong-answer">
            <XCircle size={14} /> Wrong Answer
          </span>
        );
      case 'COMPILATION_ERROR':
        return (
          <span className="io-status-badge badge-compilation-error">
            <AlertCircle size={14} /> Compilation Error
          </span>
        );
      case 'TIME_LIMIT_EXCEEDED':
        return (
          <span className="io-status-badge badge-tle">
            <Clock size={14} /> Time Limit Exceeded
          </span>
        );
      case 'RUNTIME_ERROR':
        return (
          <span className="io-status-badge badge-runtime-error">
            <AlertCircle size={14} /> Runtime Error
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="io-panel-container">
      {/* Console Header Tabs */}
      <div className="io-panel-header">
        <div className="io-tabs-group">
          <button
            onClick={() => setActiveTab('output')}
            className={`io-tab-btn ${activeTab === 'output' ? 'active' : ''}`}
          >
            <Terminal size={14} color="#58a6ff" />
            <span>Output Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab('stdin')}
            className={`io-tab-btn ${activeTab === 'stdin' ? 'active' : ''}`}
          >
            <FileCode2 size={14} color="#bc8cff" />
            <span>Custom Stdin</span>
            {customInput.trim() && <span className="io-tab-dot" />}
          </button>

          <button
            onClick={() => setActiveTab('testcases')}
            className={`io-tab-btn ${activeTab === 'testcases' ? 'active' : ''}`}
          >
            <CheckCircle2 size={14} color="#3fb950" />
            <span>Test Cases ({testCases.length})</span>
          </button>
        </div>

        {/* Execution Metrics / Status */}
        {outputResult && activeTab === 'output' && (
          <div className="io-metrics-container">
            {renderStatusBadge(outputResult.status)}

            <div className="io-stat-info">
              <span className="io-stat-item">
                <Clock size={12} />
                {outputResult.executionTimeMs} ms
              </span>
              <span className="io-stat-item">
                <Cpu size={12} />
                {(outputResult.memoryUsedKb / 1024).toFixed(1)} MB
              </span>
            </div>

            {outputResult.stdout && (
              <button
                onClick={handleCopyOutput}
                className="io-action-btn"
                title="Copy output"
              >
                {copied ? <Check size={14} color="#3fb950" /> : <Copy size={14} />}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tab Content Pane */}
      <div className="io-content-pane">
        {/* Output Tab */}
        {activeTab === 'output' && (
          <div className="io-terminal-view">
            {isRunning ? (
              <div className="io-loading-state">
                <div className="io-spinner" />
                <span>Compiling and executing code in sandbox...</span>
              </div>
            ) : outputResult ? (
              <>
                {/* Compilation Output */}
                {outputResult.compileOutput && (
                  <div className="io-output-block">
                    <span className="io-block-title title-error">Compilation Output:</span>
                    <pre className="io-pre-box io-pre-compile">
                      {outputResult.compileOutput}
                    </pre>
                  </div>
                )}

                {/* Stdout */}
                {outputResult.stdout && (
                  <div className="io-output-block">
                    <span className="io-block-title">Standard Output:</span>
                    <pre className="io-pre-box io-pre-stdout">
                      {outputResult.stdout}
                    </pre>
                  </div>
                )}

                {/* Stderr */}
                {outputResult.stderr && (
                  <div className="io-output-block">
                    <span className="io-block-title title-error">Standard Error:</span>
                    <pre className="io-pre-box io-pre-stderr">
                      {outputResult.stderr}
                    </pre>
                  </div>
                )}

                {!outputResult.stdout && !outputResult.stderr && !outputResult.compileOutput && (
                  <div className="io-empty-state">
                    Program executed successfully with no output.
                  </div>
                )}
              </>
            ) : (
              <div className="io-empty-state">
                <Terminal size={32} style={{ marginBottom: 8, opacity: 0.4 }} />
                <p>Click "Run" or press <kbd style={{ padding: '2px 6px', background: '#21262d', border: '1px solid #30363d', borderRadius: 4 }}>Ctrl + Enter</kbd> to execute.</p>
              </div>
            )}
          </div>
        )}

        {/* Custom Stdin Tab */}
        {activeTab === 'stdin' && (
          <div className="io-stdin-view">
            <div className="io-stdin-header">
              <span>Standard Input for execution:</span>
              <span style={{ color: '#484f58', textTransform: 'none' }}>Passed via stdin</span>
            </div>
            <textarea
              value={customInput}
              onChange={(e) => onCustomInputChange(e.target.value)}
              placeholder="Enter custom input lines here (e.g. 5\n1 2 3 4 5)..."
              className="io-stdin-textarea"
            />
          </div>
        )}

        {/* Test Cases Tab */}
        {activeTab === 'testcases' && (
          <TestCaseManager
            testCases={testCases}
            onTestCasesChange={onTestCasesChange}
            batchResult={batchResult}
            isRunning={isRunning}
          />
        )}
      </div>
    </div>
  );
}

export default InputOutputPanel;