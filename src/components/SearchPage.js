import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import search from '../assets/search.svg';
import '../css/App.css';
import MovieCard from './MovieCard';
import Footer from './Footer';

const API_URL = 'http://www.omdbapi.com?apikey=746f023c';
const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies('new');
  }, []);
  return (
    <div className="app">
      <h1>MoviesLand</h1>
      <div className="search">
        <input
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <img
          src={search}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        ></img>
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="container">
          <h1>No movies found</h1>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
