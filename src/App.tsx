import { useState } from 'react';
import './App.css';

// Данные для карточек
const emojis = [
  {
    symbol: '💯',
    title: '100',
    keywords: 'hundred points symbol wow win perfect parties',
  },
  {
    symbol: '🔢',
    title: '1234',
    keywords: 'input symbol for numbers symbol',
  },
  {
    symbol: '🅰️',
    title: 'A',
    keywords: 'blood type letter a uppercase red alphabet',
  },
];

function App() {
  const [search, setSearch] = useState('');

  // Фильтруем массив по введенному тексту
  const visibleEmojis = emojis.filter((emoji) => {
    const query = search.toLowerCase();
    return (
      emoji.title.toLowerCase().includes(query) ||
      emoji.keywords.toLowerCase().includes(query)
    );
  });

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
        </div>
      </header>

      <main className="cards-grid">
        {visibleEmojis.map((emoji) => (
          <div key={emoji.title} className="card">
            <div className="card-emoji">{emoji.symbol}</div>
            <div className="card-title">{emoji.title}</div>
            <div className="card-description">{emoji.keywords}</div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
