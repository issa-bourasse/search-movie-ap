import axios from 'axios';

const TMDB_API_KEY = '839ed3ea965bfe9e69eaf06fdad47a3b';
const OMDB_API_KEY = '29793c46';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query) => {
  const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
    params: {
      api_key: TMDB_API_KEY,
      query: query
    }
  });
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: TMDB_API_KEY
    }
  });
  return response.data;
};

export const getMovieRatings = async (imdbId) => {
  const response = await axios.get(OMDB_BASE_URL, {
    params: {
      apikey: OMDB_API_KEY,
      i: imdbId
    }
  });
  return response.data;
};
