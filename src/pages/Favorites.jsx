import MovieGrid from "../components/MovieGrid.jsx";

export default function Favorites(props) {
  const favMovies = props.movies.filter((m) => props.favorites.includes(m.id));
  return (
    <section className="section">
      <h2>❤️ Your Favorites</h2>
      <MovieGrid {...props} movies={favMovies} empty="No favorites yet. Tap ♡ on any movie card!" />
    </section>
  );
}
