import './styles.css';
import { useEffect, useState } from 'react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm) {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${searchTerm}`
        );
        const data = await response.json();
        setData(data);
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  return (
    <div className="App">
      <h1>Search Code Repo on GitHub</h1>
      <input type="text" value={searchTerm} onChange={handleChange} />
      {loading ? (
        <p>loading...</p>
      ) : !data ? null : (
        data.items.map((item) => <h3 key={item.id}>{item.full_name}</h3>)
      )}
    </div>
  );
}
