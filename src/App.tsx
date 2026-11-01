import { useState, useEffect } from 'react';
import { getEmojis, type IEmojiItem } from './api/emojiApi';
import './App.css';

function App() {
  const [emojis, setEmojis] = useState<IEmojiItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // запрашиваем эмодзи при каждом изменении текста в поиске
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getEmojis(search);
        setEmojis(data);
      } catch {
        // текст ошибки как в методичке
        setError('Не удалось загрузить данные. Проверьте, запущен ли сервер (start.bat).');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Emoji Finder</h1>
        <p className="subtitle">Find emoji by keywords</p>
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Placeholder"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute',
                right: '30px',
                top: '20px',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                fontSize: '20px',
              }}
            >
              ✕
            </button>
          )}
        </div>
      </header>

      <main className="cards-grid">
        {loading && <div className="state-message">Загрузка эмодзи...</div>}

        {error && <div className="state-message error">{error}</div>}

        {!loading && !error && emojis.length === 0 && (
          <p className="state-message">Эмодзи не найдены</p>
        )}

        {!loading &&
          !error &&
          emojis.map((emoji, index) => (
            <div key={index} className="card">
              <div className="card-emoji">{emoji.emoji}</div>
              <div className="card-title">{emoji.title}</div>
              <div className="card-description">{emoji.keywords}</div>
            </div>
          ))}
      </main>
    </div>
  );
}

export default App;
