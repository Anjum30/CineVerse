import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Favorites from "./pages/Favorites.jsx";
import { fetchMovies } from "./data/movies.js";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cv-favorites")) || []; } catch { return []; }
  });

  useEffect(() => { fetchMovies().then((d) => { setMovies(d); setLoading(false); }); }, []);
  useEffect(() => { localStorage.setItem("cv-favorites", JSON.stringify(favorites)); }, [favorites]);

  const toggleFavorite = (id) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const shared = { movies, loading, favorites, toggleFavorite };

  return (
    <>
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home {...shared} />} />
          <Route path="/movies" element={<Movies {...shared} />} />
          <Route path="/movie/:id" element={<MovieDetails {...shared} />} />
          <Route path="/favorites" element={<Favorites {...shared} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
