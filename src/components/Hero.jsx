import { useState } from "react";
import { Link } from "react-router-dom";
import VideoModal from "./VideoModal.jsx";

export default function Hero({ movie }) {
  const [playing, setPlaying] = useState(false);
  if (!movie) return <div className="hero skeleton" />;
  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url("${movie.backdrop}")` }} />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>{movie.title}</h1>
        <p className="meta">⭐ {movie.rating} &nbsp; {movie.year} &nbsp; {movie.genres.join(" / ")}</p>
        <p className="desc">{movie.description}</p>
        <div className="btn-row">
          <button className="btn primary" onClick={() => setPlaying(true)}>▶ Watch Movie</button>
          <Link to={`/movie/${movie.id}`} className="btn secondary">More Details</Link>
        </div>
      </div>
      {playing && <VideoModal movie={movie} onClose={() => setPlaying(false)} />}
    </section>
  );
}
