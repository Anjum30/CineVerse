import { useState } from "react";
import Hero from "../components/Hero.jsx";
import SearchBar from "../components/SearchBar.jsx";
import MovieGrid from "../components/MovieGrid.jsx";

export default function Home(props) {
  const { movies } = props;
  const [query, setQuery] = useState("");

  const searching = query.trim() !== "";
  const results = movies.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <Hero movie={movies[0]} />
      <section className="section"><SearchBar value={query} onChange={setQuery} /></section>
      {searching ? (
        <section className="section">
          <h2>Results for "{query}"</h2>
          <MovieGrid {...props} movies={results} />
        </section>
      ) : (
        <>
          <section className="section">
            <h2>🔥 Trending Now</h2>
            <MovieGrid {...props} movies={movies.filter((m) => m.trending)} row />
          </section>
          <section className="section">
            <h2>⭐ Popular Movies</h2>
            <MovieGrid {...props} movies={movies} />
          </section>
        </>
      )}
    </>
  );
}
