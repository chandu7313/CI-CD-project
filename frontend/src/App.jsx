import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = '/api/items';

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      setLoading(false);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    try {
      const response = await axios.post(API_URL, { name: newItem });
      setItems([response.data, ...items]);
      setNewItem('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple MERN App</h1>
        
        <form onSubmit={addItem}>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
          />
          <button type="submit">Add</button>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item._id}>
                {item.name} <small>({new Date(item.createdAt).toLocaleString()})</small>
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
