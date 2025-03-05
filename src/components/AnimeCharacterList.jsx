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
  const { darkMode, toggleDarkMode } = useTheme();

  const fetchCharacters = async () => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/characters?page=${page}&limit=20`
      );
      const data = await response.json();
      
      if (data.data.length === 0) {
        setHasMore(false);
        return;
      }

      setCharacters(prev => [...prev, ...data.data]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="header">
        <h2>Anime Characters</h2>
        <button onClick={toggleDarkMode} className="theme-toggle">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <InfiniteScroll
        dataLength={characters.length}
        next={fetchCharacters}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more characters to load.</p>}
      >
        <motion.div
          className="grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {characters.map((char) => (
            <motion.div
              key={char.mal_id}
              className="card"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={char.images.jpg.image_url} alt={char.name} />
              <h3>{char.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </InfiniteScroll>
    </div>
  );
};

export default AnimeCharacterList;