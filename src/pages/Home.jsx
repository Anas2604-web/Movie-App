import MovieCard from "../components/MovieCard";
import  {useState } from "react";
import "../css/Home.css";
import { useEffect } from "react"; 
import { searchMovies, getPopularMovies } from "../services/api";



function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isSearchMode, setIsSearchMode] = useState(false);



  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   if (!searchQuery.trim()) return
  //   if (loading) return

  //   setLoading(true)
  //   try {
  //       const searchResults = await searchMovies(searchQuery)
  //       setMovies(searchResults)
  //       setError(null)
  //   } catch (err) {
  //       console.log(err)
  //       setError("Failed to search movies...")
  //   } finally {
  //       setLoading(false)
  //   }
  // };
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
  
    setLoading(true);
    setIsSearchMode(true); // 👈 Set to true when searching
  
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };
  
  const handleBack = async () => {
    setSearchQuery("");
    setIsSearchMode(false);
    setError(null);
    setLoading(true);
  
    try {
      const defaultMovies = await fetchMovies();
      setMovies(defaultMovies);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch movies...");
    } finally {
      setLoading(false);
    }
  };
  const fetchMovies = async () => {
    try {
      const popularMovies = await getPopularMovies();
      return popularMovies;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to load movies...");
    }
  }

  



  return (
    <div className="home">
      {isSearchMode && (
        
      <button onClick={handleBack} className="back-arrow-btn">
        ← Back
      </button>
    )}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

        {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      )  : movies.length === 0 ? (
        <div className="no-movies-found">No movies found. Try a different search 😶‍🌫️.</div>
      ) : (
        <div className="movies-grid">  
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} /> 
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
// function Home() {
//     const [searchQuery, setSearchQuery] = useState("");
//     const movies = [
//         { id : 1, title: "John Wick", release_date :"2020" },
//         { id : 2, title: "Terminator", release_date :"2021" },
//         { id : 3, title: "The Matrix", release_date :"2022" },
//         // { id : 4, title: "", release_date :"2023" },
//         // { id : 5, title: "John Wick 5", release_date :"2024" },
//         // { id : 6, title: "John Wick 6", release_date :"2025" },
//         // { id : 7, title: "John Wick 7", release_date :"2026" },
//         // { id : 8, title: "John Wick 8", release_date :"2027" },
//         // { id : 9, title: "John Wick 9", release_date :"2028" },
//         // { id : 10, title: "John Wick 10", release_date :"2029" }
//     ];

// const handleSearch = (e) => {
//     e.preventDefault();
//     alert(searchQuery);
//     setSearchQuery("------");
// };
    

// return (
//   <div className="home">
//     <form onSubmit = {handleSearch} className="search-form">
//         <input 
//         type="text"
//          placeholder="Search for movies..."
//           className="search-input"
//           value={searchQuery}
//           onChange={(e)=> setSearchQuery(e.target.value)}
//            />
//            <button type="submit" className="search-button">Search</button>
//     </form>
    
//     <div className="movies-grid">
//         {movies.map((movie)=> ( <MovieCard movie = {movie} key = {movie.id} />
//         )
//         )}
//     </div>

    
// </div>
// );
// }

// export default Home;



