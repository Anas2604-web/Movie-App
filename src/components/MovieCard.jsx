import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

import { Link } from "react-router-dom";

import { useState } from "react";



function MovieCard({ movie }) {
  const { isFavourite, addToFavourites, removeFromFavourites } = useMovieContext();
  const favourite = isFavourite(movie.imdbID);
  const [statusMessage, setStatusMessage] = useState("");

  const handleFavouriteClick = (e) => {
    e.preventDefault(); // Prevents page navigation
    if (favourite) {
      removeFromFavourites(movie.imdbID);
      setStatusMessage("Removed from favourites 💔");
    } else {
      addToFavourites(movie);
      setStatusMessage("Added to favourites ❤️");
    }

    // Hide the message after 1.5 seconds
    setTimeout(() => setStatusMessage(""), 1500);
  };

  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      <div className="movie-poster">
        <img src={movie.Poster} alt={movie.Title} />
        <div className="movie-overlay">
          <button
            className={`favourite-btn ${favourite ? "active" : ""}`}
            onClick={handleFavouriteClick}
          >
            ♥
          </button>
          {statusMessage && <span className="favourite-status">{statusMessage}</span>}
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
