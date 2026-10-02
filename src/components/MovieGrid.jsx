import MovieCard from "./MovieCard.jsx";
import Loader from "./Loader.jsx";

export default function MovieGrid({ movies, loading, favorites, toggleFavorite, row = false, empty = "No movies found." }) {
  if (loading) return <Loader count={row ? 5 : 8} />;
  if (!movies.length) return <p className="empty">{empty}</p>;
  return (
    <div className={row ? "row-scroll" : "grid"}>
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} isFav={favorites.includes(m.id)} onToggle={toggleFavorite} />
      ))}
    </div>
  );
}
