import { useState } from "react" 


function TestComponent() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    const res = await fetch('http://localhost:5000/api/test');
    const json = await res.json();
    setData(json);
  };

  const addMessage = async () => {
    await fetch('http://localhost:5000/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    setMessage('');
    fetchData(); // osveži listu
  };

  const updateMessage = async (id) => {
    await fetch(`http://localhost:5000/api/test/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Izmenjena poruka ✏️' }),
    });
    fetchData();
  };

  const deleteMessage = async (id) => {
    await fetch(`http://localhost:5000/api/test/${id}`, {
      method: 'DELETE',
    });
    fetchData();
  };

  return (
    <div>
      <h2>Test CRUD sa bazom</h2>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Unesi poruku"
      />
      <button onClick={addMessage}>Dodaj poruku</button>
      <button onClick={fetchData}>Osveži listu</button>

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.id}. {item.message}{' '}
            <button onClick={() => updateMessage(item.id)}>Izmeni</button>
            <button onClick={() => deleteMessage(item.id)}>Obriši</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 

export default TestComponent 