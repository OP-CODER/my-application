import React, { useEffect, useState } from 'react';
import ItemsList from './ItemsList';

function App() {
  const [backendStatus, setBackendStatus] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/status')
      .then(res => res.json())
      .then(data => setBackendStatus(data.status))
      .catch(err => setBackendStatus('Failed to fetch backend status'));
  }, []);

  return (
    <div>
      <h1>My React App</h1>
      <p><em>{backendStatus}</em></p>
      <ItemsList />
    </div>
  );
}

export default App;
