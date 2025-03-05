import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CharacterCard = ({ character }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.mal_id === character.mal_id));
  }, [character.mal_id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.mal_id !== character.mal_id);
    } else {
      updatedFavorites = [...favorites, character];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={character.images.jpg.image_url} alt={character.name} />
      <h3>{character.name}</h3>
      <p className="favorites">❤️ {character.favorites || 0}</p>
      <button className="fav-btn" onClick={toggleFavorite}>
        {isFavorite ? "❤️ Remove" : "🤍 Add to Fav"}
      </button>
    </motion.div>
  );
};

export default CharacterCard;