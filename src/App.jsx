import "./css/App.css";
import Favourites from "./pages/Favourites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/movie/:imdbID" element={<MovieDetail />} /> 
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
