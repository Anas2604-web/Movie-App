import "../css/Favourites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favourites() {
  const { favourites } = useMovieContext();

  return (
    <div className="favourites">
      <h2>Your Favourites</h2>

      {favourites.length === 0 ? (
        <div className="favourites-empty">
          <h2>No Favourite Movies Yet</h2>
          
        </div>
      ) : (
        <div className="movies-grid">
          {favourites.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
            
          ))}
        </div>
      )}
    </div>
  );
}
export default Favourites;
