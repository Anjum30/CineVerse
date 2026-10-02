import { Link } from "react-router-dom";

export default function MovieCard({ movie, isFav, onToggle }) {
  return (
    <div className="card">
      <button className="fav" aria-label="Toggle favorite" onClick={() => onToggle(movie.id)}>{isFav ? "♥" : "♡"}</button>
      <Link to={`/movie/${movie.id}`}>
        <div className="poster-wrap">
          <img src={movie.poster} alt={movie.title} loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = movie.fallbackPoster; }} />
          <div className="card-overlay" />
        </div>
        <div className="card-info">
          <h3>{movie.title}</h3>
          <p>⭐ {movie.rating} · {movie.year}</p>
        </div>
      </Link>
    </div>
  );
}
