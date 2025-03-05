import React, { useEffect, useState } from "react";
import "./AnimeCharacterList.css";

const AnimeCharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const fetchCharacters = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/characters?page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      const data = await response.json();
      setCharacters(data.data);
      setTotalPages(Math.ceil(data.pagination.items.total / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Anime Characters</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {characters.map((char) => (
            <div key={char.mal_id} className="card">
              <img src={char.images.jpg.image_url} alt={char.name} />
              <h3>{char.name}</h3>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AnimeCharacterList;