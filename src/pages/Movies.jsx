import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import MovieGrid from "../components/MovieGrid.jsx";

export default function Movies(props) {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const setQuery = (v) => setParams(v ? { q: v } : {}, { replace: true });

  const list = props.movies.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="section">
      <h2>{query ? `Results for "${query}"` : "All Movies"}</h2>
      <SearchBar value={query} onChange={setQuery} />
      <MovieGrid {...props} movies={list} />
    </section>
  );
}
