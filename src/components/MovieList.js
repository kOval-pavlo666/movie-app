// src/components/MovieList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { Pagination } from 'react-bootstrap';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: '2fce9ffbb795345b82084d1d34d5821a',
        page: currentPage,
        language: 'uk'
      },
      headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmNlOWZmYmI3OTUzNDViODIwODRkMWQzNGQ1ODIxYSIsInN1YiI6IjY2NTRlNTgyOWM0MzAxMTBmOWI3ZGVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0gfGnOiVDsBd2vUCYbC1GTXOFqNRVIvI0Vlz9_Yg9Bk'
      }
    });
    setMovies(response.data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchMovies();
  };


  const paginationStyle = {
    display: 'flex',
    listStyle: 'none',
    padding: '0',
    justifyContent: 'center'
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    color: '#fff',
    padding: '6px 12px',
    margin: '0 3px',
    cursor: 'pointer',
    borderRadius: '3px',
    outline: 'none',
    color: 'white'
  };

  return (
    <div>
      <h1>Popular Movies</h1>
      <div>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie}/>
        ))}
      </div>
      <Pagination style={paginationStyle}>
        <Pagination.First style={buttonStyle} onClick={() => handlePageChange(1)} />
        <Pagination.Prev style={buttonStyle} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        <Pagination.Item style={buttonStyle} active>{currentPage}</Pagination.Item>
        <Pagination.Next style={buttonStyle} onClick={() => handlePageChange(currentPage + 1)} />
      </Pagination>
    </div>
  );
};

export default MovieList;
