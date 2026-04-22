import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('Main.tsx loading...');
console.log('Root element:', document.getElementById('root'));

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('ERROR: Root element not found!');
  document.body.innerHTML = '<div style="color: red; padding: 20px;">ERROR: Root element not found!</div>';
} else {
  try {
    console.log('Creating React root...');
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('React app rendered successfully');
  } catch (error) {
    console.error('ERROR rendering app:', error);
    rootElement.innerHTML = `<div style="color: red; padding: 20px;">ERROR: ${error}</div>`;
  }
}

