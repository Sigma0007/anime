import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import CharacterCard from "./CharacterCard";
import { motion } from "framer-motion";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="header">
        <h2>My Favorite Characters</h2>
      </div>
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <motion.div
          className="grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {favorites.map((char) => (
            <CharacterCard key={char.mal_id} character={char} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Favorites;