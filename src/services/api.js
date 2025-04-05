const API_KEY = "1dc5da18";
const BASE_URL = "https://www.omdbapi.com/";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}?s=batman&apikey=${API_KEY}`);
  const data = await response.json();
  return data.Search || [];
};

export const searchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
  const data = await response.json();
  return data.Search || [];
};
