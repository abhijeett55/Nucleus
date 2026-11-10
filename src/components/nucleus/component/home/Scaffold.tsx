export interface Scaffold {
  html: string;
  css: string;
  js: string;
}

export type ScaffoldResult =
  | { supported: true; scaffold: Scaffold }
  | { supported: false; reason: string };

export const HTML_CSS_SCAFFOLD: Scaffold = {
  html: `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /><title>New Project</title></head>
<body>
  <h1>Hello, world</h1>
</body>
</html>`,
  css: `body { font-family: sans-serif; margin: 40px; }`,
  js: `console.log('Ready');`,
};

const JAVASCRIPT_SCAFFOLD: Scaffold = {
  html: `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /><title>JavaScript Starter</title></head>
<body>
  <div id="app"></div>
</body>
</html>`,
  css: `body { font-family: sans-serif; margin: 40px; }`,
  js: `document.getElementById('app').textContent = 'Hello from JavaScript';`,
};

const REACT_SCAFFOLD: Scaffold = {
  html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>React Starter</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
  css: `body { margin: 0; font-family: sans-serif; }
#root { padding: 24px; }`,
  js: `function App() {
  return React.createElement('h1', null, 'Hello from React');
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));`,
};

const VUE_SCAFFOLD: Scaffold = {
  html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Vue Starter</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.15/vue.global.prod.min.js"></script>
</head>
<body>
  <div id="app">{{ message }}</div>
</body>
</html>`,
  css: `body { font-family: sans-serif; margin: 40px; }`,
  js: `const { createApp } = Vue;
createApp({
  data() { return { message: 'Hello from Vue' }; }
}).mount('#app');`,
};

const TAILWIND_SCAFFOLD: Scaffold = {
  html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Tailwind Starter</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-white min-h-screen flex items-center justify-center">
  <h1 class="text-3xl font-bold">Hello, Tailwind</h1>
</body>
</html>`,
  css: `/* Utility classes come from the Tailwind CDN script in index.html */`,
  js: `console.log('Ready');`,
};

const SCAFFOLDS_BY_NAME: Record<string, Scaffold> = {
  'html + css': HTML_CSS_SCAFFOLD,
  'javascript': JAVASCRIPT_SCAFFOLD,
  'react': REACT_SCAFFOLD,
  'react (ts)': REACT_SCAFFOLD,
  'react + chakra': REACT_SCAFFOLD,
  'react (rsbuild + ts)': REACT_SCAFFOLD,
  'react (farm fe + ts)': REACT_SCAFFOLD,
  'preact': REACT_SCAFFOLD,
  'vue': VUE_SCAFFOLD,
  'tailwindcss': TAILWIND_SCAFFOLD,
};

const UNSUPPORTED_REASON =
  'This template needs a server or build toolchain this browser-based editor can\'t run yet. It will open with a blank starter instead.';

export function getScaffold(templateName: string): ScaffoldResult {
  const key = templateName.toLowerCase();
  const scaffold = SCAFFOLDS_BY_NAME[key];
  if (scaffold) {
    return { supported: true, scaffold };
  }
  return { supported: false, reason: UNSUPPORTED_REASON };
}