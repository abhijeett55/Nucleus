import { useRef } from 'react';
import Editor, { loader } from '@monaco-editor/react';
import type { OnMount } from '@monaco-editor/react';
import type { LanguageConfig, EditorSettings } from '../../types/playground';
import './CodeEditor.css';

loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.49.0/min/vs',
  },
});

export interface CodeEditorProps {
  language?: LanguageConfig;
  value?: string;
  onChange?: (value: string) => void;
  onRunCode?: () => void;
  settings?: EditorSettings;
}

const DEFAULT_SETTINGS: EditorSettings = {
  fontSize: 14,
  tabSize: 4,
  wordWrap: 'on',
  minimap: true,
  keybinding: 'standard',
  theme: 'nucleus-dark',
  autoCloseBrackets: 'always',
};

export function CodeEditor({
  language,
  value = '',
  onChange = () => {},
  onRunCode = () => {},
  settings = DEFAULT_SETTINGS,
}: CodeEditorProps) {
  const editorRef = useRef<unknown>(null);

  const monacoLanguage = language?.monacoLanguage || 'cpp';
  const currentTheme = settings?.theme || 'nucleus-dark';

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Define Custom Nucleus Dark Theme
    monaco.editor.defineTheme('nucleus-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '8b949e', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'ff7b72', fontStyle: 'bold' },
        { token: 'string', foreground: 'a5d6ff' },
        { token: 'number', foreground: '79c0ff' },
        { token: 'type', foreground: 'ffa657' },
        { token: 'function', foreground: 'd2a8ff' },
      ],
      colors: {
        'editor.background': '#0d1117',
        'editor.foreground': '#c9d1d9',
        'editor.lineHighlightBackground': '#161b22',
        'editorCursor.foreground': '#58a6ff',
        'editorLineNumber.foreground': '#484f58',
        'editorLineNumber.activeForeground': '#c9d1d9',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#1f242c',
        'editorIndentGuide.background': '#21262d',
        'editorIndentGuide.activeBackground': '#30363d',
      },
    });

    monaco.editor.setTheme(currentTheme === 'nucleus-dark' ? 'nucleus-dark' : currentTheme);

    // Register Ctrl+Enter / Cmd+Enter shortcut to Run Code
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRunCode();
    });

    editor.focus();
  };

  return (
    <div className="nucleus-editor-container">
      <Editor
        height="100%"
        language={monacoLanguage}
        value={value}
        onChange={(val) => onChange(val || '')}
        onMount={handleEditorDidMount}
        theme={currentTheme === 'nucleus-dark' ? 'nucleus-dark' : currentTheme}
        options={{
          fontSize: settings?.fontSize ?? 14,
          tabSize: settings?.tabSize ?? 4,
          wordWrap: settings?.wordWrap ?? 'on',
          minimap: { enabled: settings?.minimap ?? true },
          automaticLayout: true,
          fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
          fontLigatures: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          formatOnPaste: true,
          formatOnType: true,
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
          scrollBeyondLastLine: false,
          padding: { top: 12, bottom: 12 },
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: 'on',
        }}
      />
    </div>
  );
}

export default CodeEditor;