import { useState, useEffect, useCallback } from 'react';
import type { 
  LanguageConfig, 
  ExecuteResponse, 
  BatchExecutionResponse, 
  TestCase,
  TestCaseResult, 
  EditorSettings 
} from '../../types/playground';
import { SUPPORTED_LANGUAGES } from '../../language/language';
import { ExecutionService } from '../../api/executionApi';
import { PlaygroundHeader } from './PlaygroundHeader';
import { CodeEditor } from './CodeEditor';
import { InputOutputPanel } from './InputOutputPanel';
import './CompetitivePlayground.css';

export function CompetitivePlayground() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageConfig>(
    SUPPORTED_LANGUAGES[0] || {
      id: 'cpp',
      name: 'C++ 23',
      version: 'GCC 14.1',
      monacoLanguage: 'cpp',
      defaultFileName: 'solution.cpp',
      extension: '.cpp',
      category: 'popular',
      templateCode: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello Nucleus!";\n    return 0;\n}',
    }
  );

  // Preserve written code per language
  const [codeMap, setCodeMap] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    SUPPORTED_LANGUAGES.forEach((lang) => {
      map[lang.id] = lang.templateCode;
    });
    return map;
  });

  // Stdin & Output states
  const [customInput, setCustomInput] = useState<string>('World');
  const [outputResult, setOutputResult] = useState<ExecuteResponse | null>(null);
  const [batchResult, setBatchResult] = useState<BatchExecutionResponse | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Test cases
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: 'case-1', name: 'Case 1', input: 'Nucleus', expectedOutput: 'Hello, Nucleus!' },
    { id: 'case-2', name: 'Case 2', input: 'World', expectedOutput: 'Hello, World!' },
    { id: 'case-3', name: 'Case 3', input: '', expectedOutput: 'Hello, Competitive Programmer from Nucleus!' },
  ]);

  // Editor Settings
  const [settings, setSettings] = useState<EditorSettings>({
    fontSize: 14,
    tabSize: 4,
    wordWrap: 'on',
    minimap: true,
    keybinding: 'standard',
    theme: 'nucleus-dark',
    autoCloseBrackets: 'always',
  });

  // Split view height percentage (e.g. 60% editor, 40% console)
  const [splitRatio, setSplitRatio] = useState<number>(60);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const currentCode = codeMap[selectedLanguage?.id] || selectedLanguage?.templateCode || '';

  const handleCodeChange = (newCode: string) => {
    if (!selectedLanguage) return;
    setCodeMap((prev) => ({
      ...prev,
      [selectedLanguage.id]: newCode,
    }));
  };

  const handleResetCode = () => {
    if (!selectedLanguage) return;
    if (window.confirm(`Reset ${selectedLanguage.name} code to default boilerplate template?`)) {
      handleCodeChange(selectedLanguage.templateCode);
    }
  };

  // Run single execution with custom Stdin
  const handleRunCode = useCallback(async () => {
    if (isRunning || !selectedLanguage) return;
    setIsRunning(true);
    try {
      const response = await ExecutionService.runCode({
        languageId: selectedLanguage.id,
        sourceCode: currentCode,
        stdin: customInput,
        timeoutMs: 5000,
      });
      setOutputResult(response);
    } catch (err: unknown) {
      console.error('Run failed:', err);
    } finally {
      setIsRunning(false);
    }
  }, [isRunning, selectedLanguage, currentCode, customInput]);

  // Run all test cases
  const handleRunTestCases = useCallback(async () => {
    if (isRunning || !selectedLanguage) return;
    setIsRunning(true);
    try {
      const response = await ExecutionService.runTestCases(
        selectedLanguage.id,
        currentCode,
        testCases,
        5000
      );
      setBatchResult(response);
      
      // Format standard output for the output tab
      // setOutputResult({
      //   status: response.overallStatus,
      //   stdout: response.results
      //     .map((r, i) => `[Test ${i + 1} - ${r.name}] ${r.status}\nOutput: ${r.actualOutput}`)
      //     .join('\n\n'),
      //   stderr: '',
      //   executionTimeMs: response.totalTimeMs,
      //   memoryUsedKb: response.peakMemoryKb,
      //   exitCode: response.overallStatus === 'ACCEPTED' ? 0 : 1,
      // });
            // Format standard output for the output tab
      setOutputResult({
        status: response.overallStatus,
        stdout: response.results
          // FIXED: Added explicit types here
          .map((r: TestCaseResult, i: number) => `[Test ${i + 1} - ${r.name}] ${r.status}\nOutput: ${r.actualOutput}`)
          .join('\n\n'),
        stderr: '',
        executionTimeMs: response.totalTimeMs,
        memoryUsedKb: response.peakMemoryKb,
        exitCode: response.overallStatus === 'ACCEPTED' ? 0 : 1,
      });
    } catch (err: unknown) {
      console.error('Test cases run failed:', err);
    } finally {
      setIsRunning(false);
    }
  }, [isRunning, selectedLanguage, currentCode, testCases]);

  // Global Ctrl+Enter / Cmd+Enter shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRunCode]);

  // Split drag handlers
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const containerHeight = window.innerHeight - 56; // 56px header height
      const newRatio = ((e.clientY - 56) / containerHeight) * 100;
      if (newRatio > 20 && newRatio < 85) {
        setSplitRatio(newRatio);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="competitive-playground-container">
      {/* Header Toolbar */}
      <PlaygroundHeader
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        onResetCode={handleResetCode}
        onRunCode={handleRunCode}
        onRunTestCases={handleRunTestCases}
        isRunning={isRunning}
        settings={settings}
        onSettingsChange={setSettings}
      />

      {/* Main Workspace Area (Split Vertically) */}
      <div className="playground-workspace">
        {/* Upper: Monaco Code Editor */}
        <div 
          style={{ height: `${splitRatio}%` }} 
          className="playground-editor-pane"
        >
          <CodeEditor
            language={selectedLanguage}
            value={currentCode}
            onChange={handleCodeChange}
            onRunCode={handleRunCode}
            settings={settings}
          />
        </div>

        {/* Drag Splitter Bar */}
        <div
          onMouseDown={handleMouseDown}
          className="playground-splitter-bar"
          title="Drag to resize console"
        >
          <div className="playground-splitter-handle" />
        </div>

        {/* Lower: Input / Output Console */}
        <div 
          style={{ height: `${100 - splitRatio}%` }} 
          className="playground-console-pane"
        >
          <InputOutputPanel
            customInput={customInput}
            onCustomInputChange={setCustomInput}
            outputResult={outputResult}
            batchResult={batchResult}
            testCases={testCases}
            onTestCasesChange={setTestCases}
            isRunning={isRunning}
          />
        </div>
      </div>
    </div>
  );
}

export default CompetitivePlayground;