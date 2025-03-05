import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import "./AnimeCharacterList.css";

const AnimeCharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { darkMode, toggleDarkMode } = useTheme();

  const fetchCharacters = async () => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/characters?page=${page}&limit=20&q=${searchQuery}`
      );
      const data = await response.json();
      
      if (data.data.length === 0) {
        setHasMore(false);
        return;
      }

      if (page === 1) {
        setCharacters(data.data);
      } else {
        setCharacters(prev => [...prev, ...data.data]);
      }
      setPage(prev => prev + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setCharacters([]);
    fetchCharacters();
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="header">
        <h2>Anime Characters</h2>
        <div className="controls">
          <input
            type="text"
            placeholder="Search characters..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {loading && characters.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <InfiniteScroll
          dataLength={characters.length}
          next={fetchCharacters}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more characters to load.</p>}
        >
          <motion.div
            className="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {characters.map((char) => (
              <motion.div
                key={char.mal_id}
                className="card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={char.images.jpg.image_url} alt={char.name} />
                <h3>{char.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default AnimeCharacterList;