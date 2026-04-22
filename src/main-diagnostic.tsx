import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Simple diagnostic component
function DiagnosticApp() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(to bottom right, #7dd3fc, #bfdbfe, #a5f3fc)',
      color: 'white',
      fontFamily: 'system-ui'
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌤️</h1>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Weather App Loading...</h2>
        <p style={{ fontSize: '1rem', opacity: 0.8 }}>Checking components...</p>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <DiagnosticApp />
    </StrictMode>
  );
} else {
  console.error('Root element not found!');
}
