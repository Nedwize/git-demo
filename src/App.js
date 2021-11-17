import './styles.css';
import { useState } from 'react';

export default function App() {
  const [data, setData] = useState('');
  const [time, setTime] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    setTime(false);
    setTimeout(async () => {
      setTime(true);
      if (time) {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${e.target.value}`
        );
        const data = await response.json();
        setData(data);
        setLoading(false);
      }
    }, 500);
    console.log(e.target.value);
  };

  return (
    <div className="App">
      <h1>Search Code Repo on GitHub</h1>
      <input type="text" onChange={handleChange} />
      {loading ? (
        <p>loading...</p>
      ) : !data ? null : (
        data.items.map((item) => <h3 key={item.id}>{item.full_name}</h3>)
      )}
    </div>
  );
}
