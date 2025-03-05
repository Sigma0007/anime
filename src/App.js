import React from 'react';
import AnimeCharacterList from './components/AnimeCharacterList';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <AnimeCharacterList />
      </div>
    </ThemeProvider>
  );
}

export default App;