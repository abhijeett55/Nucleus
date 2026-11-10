export type LanguageCategory = 
  | 'all'
  | 'popular'
  | 'systems'
  | 'jvm'
  | 'web'
  | 'functional'
  | 'scripting'
  | 'legacy';

export interface LanguageConfig {
  id: string;
  name: string;
  version: string;
  monacoLanguage: string;
  defaultFileName: string;
  extension: string;
  category: LanguageCategory;
  templateCode: string;
  pistonLanguage?: string;
  pistonVersion?: string;
  judge0Id?: number;
  iconColor?: string;
}

export type ExecutionStatus = 
  | 'IDLE'
  | 'RUNNING'
  | 'ACCEPTED'
  | 'WRONG_ANSWER'
  | 'TIME_LIMIT_EXCEEDED'
  | 'MEMORY_LIMIT_EXCEEDED'
  | 'COMPILATION_ERROR'
  | 'RUNTIME_ERROR'
  | 'INTERNAL_ERROR';

export interface ExecuteRequest {
  languageId: string;
  sourceCode: string;
  stdin?: string;
  expectedOutput?: string;
  timeoutMs?: number;
  memoryLimitMb?: number;
}

export interface ExecuteResponse {
  status: ExecutionStatus;
  stdout: string;
  stderr: string;
  compileOutput?: string;
  executionTimeMs: number;
  memoryUsedKb: number;
  exitCode: number;
  errorMessage?: string;
}

export interface TestCase {
  id: string;
  name: string;
  input: string;
  expectedOutput: string;
  isCustom?: boolean;
}

export interface TestCaseResult {
  testCaseId: string;
  name: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  status: ExecutionStatus;
  executionTimeMs: number;
  memoryUsedKb: number;
  passed: boolean;
  errorMessage?: string;
}

export interface BatchExecutionResponse {
  totalTestCases: number;
  passedTestCases: number;
  results: TestCaseResult[];
  overallStatus: ExecutionStatus;
  totalTimeMs: number;
  peakMemoryKb: number;
}

export type KeybindingMode = 'standard' | 'vim' | 'emacs';
export type EditorTheme = 'vs-dark' | 'light' | 'hc-black' | 'nucleus-dark';

export interface EditorSettings {
  fontSize: number;
  tabSize: number;
  wordWrap: 'on' | 'off';
  minimap: boolean;
  keybinding: KeybindingMode;
  theme: EditorTheme;
  autoCloseBrackets: 'always' | 'never';
}