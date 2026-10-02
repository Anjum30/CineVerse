export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <input type="text" placeholder="Search movies..." value={value} onChange={(e) => onChange(e.target.value)} />
      <span>🔍</span>
    </div>
  );
}
