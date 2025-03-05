import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import AnimeCharacterList from './components/AnimeCharacterList';
import Favorites from './components/Favorites';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <div className="App">
          <nav className="nav-bar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="nav-link">Favorites</Link>
          </nav>
          <Routes>
            <Route path="/" element={<AnimeCharacterList />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;