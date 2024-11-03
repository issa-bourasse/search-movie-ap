import React, { useState } from 'react';
import { searchMovies, getMovieDetails, getMovieRatings } from '../api/api';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [ratings, setRatings] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const movieResults = await searchMovies(query);
    setMovies(movieResults);
  };

  const handleMovieSelect = async (movieId) => {
    const movieDetails = await getMovieDetails(movieId);
    setSelectedMovie(movieDetails);

    if (movieDetails.imdb_id) {
      const movieRatings = await getMovieRatings(movieDetails.imdb_id);
      setRatings(movieRatings);
    }
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {movies.map((movie) => (
          <div key={movie.id} onClick={async () => await handleMovieSelect(movie.id)}>
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div>
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.overview}</p>
          <p>Genres: {selectedMovie.genres.map(genre => genre.name).join(', ')}</p>
          {ratings && (
            <div>
              <h3>Ratings from OMDB:</h3>
              <p>IMDb Rating: {ratings.imdbRating}</p>
              <p>Metascore: {ratings.Metascore}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
