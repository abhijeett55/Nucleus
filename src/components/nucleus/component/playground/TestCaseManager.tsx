import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, XCircle, Clock } from 'lucide-react';
import type { TestCase, BatchExecutionResponse } from '../../types/playground';
import './TestCaseManager.css'; // Separate CSS imported here

export interface TestCaseManagerProps {
  testCases: TestCase[];
  onTestCasesChange: (testCases: TestCase[]) => void;
  batchResult: BatchExecutionResponse | null;
  isRunning?: boolean;
}

export function TestCaseManager({
  testCases,
  onTestCasesChange,
  batchResult,
}: TestCaseManagerProps) {
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);

  const activeCase = testCases[activeCaseIndex] || testCases[0];
  const activeResult = batchResult?.results?.find((r) => r.testCaseId === activeCase?.id);

  const handleAddTestCase = () => {
    const newCaseId = `case-${Date.now()}`;
    const newCase: TestCase = {
      id: newCaseId,
      name: `Case ${testCases.length + 1}`,
      input: '',
      expectedOutput: '',
      isCustom: true,
    };
    const updated = [...testCases, newCase];
    onTestCasesChange(updated);
    setActiveCaseIndex(updated.length - 1);
  };

  const handleDeleteTestCase = (indexToDelete: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (testCases.length <= 1) return;
    const updated = testCases.filter((_, idx) => idx !== indexToDelete);
    onTestCasesChange(updated);
    if (activeCaseIndex >= updated.length) {
      setActiveCaseIndex(updated.length - 1);
    }
  };

  const handleInputChange = (value: string) => {
    const updated = [...testCases];
    updated[activeCaseIndex] = { ...updated[activeCaseIndex], input: value };
    onTestCasesChange(updated);
  };

  const handleExpectedOutputChange = (value: string) => {
    const updated = [...testCases];
    updated[activeCaseIndex] = { ...updated[activeCaseIndex], expectedOutput: value };
    onTestCasesChange(updated);
  };

  return (
    <div className="testcase-manager-container">
      {/* Test Case Tabs */}
      <div className="testcase-tabs-bar">
        {testCases.map((tc, idx) => {
          const caseResult = batchResult?.results?.find((r) => r.testCaseId === tc.id);
          const isActive = idx === activeCaseIndex;

          return (
            <button
              key={tc.id}
              onClick={() => setActiveCaseIndex(idx)}
              className={`testcase-tab-btn ${isActive ? 'active' : ''}`}
            >
              {caseResult && (
                <span>
                  {caseResult.passed ? (
                    <CheckCircle2 size={14} color="#3fb950" />
                  ) : (
                    <XCircle size={14} color="#f85149" />
                  )}
                </span>
              )}
              <span>{tc.name}</span>
              {testCases.length > 1 && (
                <span
                  onClick={(e) => handleDeleteTestCase(idx, e)}
                  className="testcase-delete-icon"
                  title="Delete Test Case"
                >
                  <Trash2 size={12} />
                </span>
              )}
            </button>
          );
        })}

        <button
          onClick={handleAddTestCase}
          className="testcase-add-btn"
          title="Add Custom Test Case"
        >
          <Plus size={14} />
          <span>Add Case</span>
        </button>

        {batchResult && (
          <div
            className={`testcase-summary-badge ${
              batchResult.overallStatus === 'ACCEPTED'
                ? 'summary-accepted'
                : 'summary-failed'
            }`}
          >
            {batchResult.passedTestCases}/{batchResult.totalTestCases} Passed
          </div>
        )}
      </div>

      {/* Case Details Editor */}
      {activeCase && (
        <div className="testcase-body">
          {/* Input Block */}
          <div className="testcase-field-group">
            <label className="testcase-field-label">
              Input (stdin)
            </label>
            <textarea
              value={activeCase.input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter standard input for this test case..."
              rows={4}
              className="testcase-textarea"
            />
          </div>

          {/* Expected Output Block */}
          <div className="testcase-field-group">
            <label className="testcase-field-label">
              Expected Output
            </label>
            <textarea
              value={activeCase.expectedOutput}
              onChange={(e) => handleExpectedOutputChange(e.target.value)}
              placeholder="Optional: Enter expected output to verify answer..."
              rows={4}
              className="testcase-textarea"
            />
          </div>

          {/* Result Block (If executed) */}
          {activeResult && (
            <div className="testcase-result-card">
              <div className="testcase-result-header">
                <div className="testcase-result-status">
                  <span className="testcase-result-title">Actual Output:</span>
                  <span
                    className={`testcase-result-pill ${
                      activeResult.passed ? 'pill-pass' : 'pill-fail'
                    }`}
                  >
                    {activeResult.passed ? 'CORRECT' : 'WRONG ANSWER'}
                  </span>
                </div>
                
                <div className="testcase-result-metrics">
                  <span className="testcase-metric-item">
                    <Clock size={12} color="#8b949e" />
                    {activeResult.executionTimeMs} ms
                  </span>
                  <span>{(activeResult.memoryUsedKb / 1024).toFixed(2)} MB</span>
                </div>
              </div>

              <pre className="testcase-output-pre">
                {activeResult.actualOutput || (
                  <span style={{ color: '#6e7681', fontStyle: 'italic' }}>
                    No output
                  </span>
                )}
              </pre>

              {activeResult.errorMessage && (
                <div className="testcase-error-box">
                  {activeResult.errorMessage}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TestCaseManager;