import React, { useEffect, useState } from 'react';

export default function AppTest() {
  const [errorMessage, setErrorMessage] = useState('');
  const [backendStatus, setBackendStatus] = useState('checking...');

  useEffect(() => {
    // Capture all errors and warnings
    window.addEventListener('error', (event) => {
      const msg = `ERROR: ${event.message}\nFile: ${event.filename}:${event.lineno}:${event.colno}\n${event.error?.stack || ''}`;
      setErrorMessage(msg);
      console.log('Captured error:', msg);
    });

    window.addEventListener('unhandledrejection', (event) => {
      const msg = `UNHANDLED PROMISE REJECTION:\n${event.reason}`;
      setErrorMessage(msg);
      console.log('Captured rejection:', msg);
    });

    // Test backend connection
    fetch('http://localhost:5000/api/doctors')
      .then(res => res.json())
      .then(data => {
        setBackendStatus(`✅ Connected! Found ${data.length || 0} doctors`);
      })
      .catch(err => {
        setBackendStatus(`❌ Backend error: ${err.message}`);
      });
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace', background: '#1a1a1a', color: '#00ff00', minHeight: '100vh' }}>
      <h1>🔍 ERROR DIAGNOSTIC</h1>
      
      <div style={{ background: '#2a2a2a', padding: '20px', marginBottom: '20px', border: '1px solid #00ff00' }}>
        <h2>ERROR MESSAGE:</h2>
        {errorMessage ? (
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#ff4444' }}>
            {errorMessage}
          </pre>
        ) : (
          <p style={{ color: '#44ff44' }}>✅ No errors detected</p>
        )}
      </div>

      <div style={{ background: '#2a2a2a', padding: '20px', marginBottom: '20px', border: '1px solid #00ff00' }}>
        <h2>BACKEND STATUS:</h2>
        <p>{backendStatus}</p>
      </div>

      <div style={{ background: '#2a2a2a', padding: '20px', border: '1px solid #00ff00' }}>
        <h2>TEST BACKEND:</h2>
        <button 
          onClick={async () => {
            try {
              const res = await fetch('http://localhost:5000/api/doctors');
              const data = await res.json();
              alert('✅ Backend Connected!\n\nResponse: ' + JSON.stringify(data).substring(0, 300));
            } catch (e: any) {
              alert('❌ Backend Failed: ' + e.message);
            }
          }}
          style={{ padding: '10px 20px', fontSize: '14px', cursor: 'pointer', background: '#00ff00', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
        >
          TEST BACKEND API
        </button>
      </div>
    </div>
  );
}
