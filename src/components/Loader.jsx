export default function Loader({ count = 8 }) {
  return (
    <div className="grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card"><div className="skeleton sk-poster" /><div className="skeleton sk-line" /></div>
      ))}
    </div>
  );
}
