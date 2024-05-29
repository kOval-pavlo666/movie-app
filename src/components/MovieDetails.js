// src/components/MovieDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from './MovieCard';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovie, setSimilarMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {    
        params: {
            api_key: '2fce9ffbb795345b82084d1d34d5821a',
            language: 'uk'
        },
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmNlOWZmYmI3OTUzNDViODIwODRkMWQzNGQ1ODIxYSIsInN1YiI6IjY2NTRlNTgyOWM0MzAxMTBmOWI3ZGVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0gfGnOiVDsBd2vUCYbC1GTXOFqNRVIvI0Vlz9_Yg9Bk'
        }
      });
      setMovie(response.data);
      console.log(response.data)
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar`, {    
        params: {
            api_key: '2fce9ffbb795345b82084d1d34d5821a',
            language: 'uk'
        },
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmNlOWZmYmI3OTUzNDViODIwODRkMWQzNGQ1ODIxYSIsInN1YiI6IjY2NTRlNTgyOWM0MzAxMTBmOWI3ZGVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0gfGnOiVDsBd2vUCYbC1GTXOFqNRVIvI0Vlz9_Yg9Bk'
        }
      });
      setSimilarMovie(response.data.results);
    };

    fetchSimilarMovies();
  }, [id]);


  if (!movie) {
    return <div>Loading...</div>;
  }


  const containerStyle = {
    padding: '20px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '10px',
    maxWidth: '400px',
    margin: '20px auto',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
};

const imgStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '10px'
};

const titleStyle = {
    fontSize: '24px',
    margin: '20px 0 10px'
};

const overviewStyle = {
    fontSize: '16px',
    color: '#555'
};

const genresStyle = {
    fontSize: '14px',
    color: '#777',
    marginTop: '10px'
};

  return (
    <div>
    <div style={containerStyle}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} style={imgStyle} alt={movie.title} />
            <h1 style={titleStyle}>{movie.title}</h1>
            <p style={overviewStyle}>{movie.overview}</p>
            <p style={genresStyle}>{movie.genres.map((genre) => (
                    <span key={genre}>
                        {genre.name || 'Unknown'}
                        <span>, </span>
                    </span>
                ))}
            </p>
            <p>Popularity {movie.popularity}</p>
        </div>
                <div>-</div>
                <div>Similar movies:</div>
                <div>-</div>
                {similarMovie.map(movie => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
        </div>
  );
};

export default MovieDetails;
