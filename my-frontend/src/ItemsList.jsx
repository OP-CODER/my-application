import React, { useEffect, useState } from 'react';

function ItemsList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/items')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched backend items:", data);
        setItems(data);
      })
      .catch(err => console.error('Error fetching items:', err));
  }, []);

  return (
    <div>
      <h2>Items Fetched From Backend</h2>
      <ul>
        {items.map(item => (
          <li key={item.id} style={{ marginBottom: '1em' }}>
            <strong>{item.name}</strong> (ID: {item.id})<br/>
            Source: {item.source}<br/>
            Timestamp: {item.timestamp || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemsList;
