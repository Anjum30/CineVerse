import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovie } from "../data/movies.js";
import VideoModal from "../components/VideoModal.jsx";

export default function MovieDetails({ favorites, toggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchMovie(id).then((m) => { setMovie(m); setLoading(false); });
  }, [id]);

  if (loading) return <section className="section details"><div className="skeleton sk-detail" /></section>;
  if (!movie) return <section className="section"><p className="empty">Movie not found.</p></section>;

  const isFav = favorites.includes(movie.id);
  const info = [["Director", movie.director], ["Cast", movie.cast.join(", ")], ["Runtime", movie.runtime],
    ["Release Date", movie.release], ["Language", movie.language], ["Rating", `⭐ ${movie.rating}`], ["Genre", movie.genres.join(", ")]];

  return (
    <section className="section">
      <button className="btn secondary back" onClick={() => navigate(-1)}>← Back</button>
      <div className="details">
        <img className="detail-poster" src={movie.poster} alt={movie.title} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = movie.fallbackPoster; }} />
        <div>
          <h1>{movie.title}</h1>
          <p className="meta">⭐ {movie.rating} &nbsp; {movie.year} &nbsp; {movie.genres.join(" | ")}</p>
          <p className="desc">{movie.description}</p>
          <div className="btn-row">
            <button className="btn primary" onClick={() => setPlaying(true)}>▶ Watch Movie</button>
            <button className="btn secondary" onClick={() => toggleFavorite(movie.id)}>{isFav ? "♥ Favorited" : "♡ Add to Favorites"}</button>
          </div>
        </div>
      </div>
      <h2>Movie Information</h2>
      <dl className="info">
        {info.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
      </dl>
      {playing && <VideoModal movie={movie} onClose={() => setPlaying(false)} />}
    </section>
  );
}
