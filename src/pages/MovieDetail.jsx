import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import '../css/MovieDetail.css';
import { Link } from "react-router-dom";
function MovieDetail() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`https://www.omdbapi.com/?apikey=1dc5da18&i=${imdbID}`);
      const data = await res.json();
      setMovie(data);
    };
    fetchMovie();
  }, [imdbID]);

  if (!movie) return <div>Loading...</div>;

    return (
    <div className="movie-details">
      <img className="movie-poster" src={movie.Poster} alt={movie.Title} />
      <div className="movie-info">
        <h2>{movie.Title}</h2>
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Runtime:</strong> {movie.Runtime}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        <Link to={`/movie/${movie.imdbID}`}></Link>

      </div>
    </div>
  );
}

export default MovieDetail;
