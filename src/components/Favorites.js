// src/components/Favorites.js
import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = () => {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(savedFavorites);
    };

    fetchFavorites();

    window.addEventListener('storage', fetchFavorites);
    return () => window.removeEventListener('storage', fetchFavorites);
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      <div>
        {favorites.length > 0 ? (
          favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No favorite movies yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
