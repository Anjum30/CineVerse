import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";

const links = [["/", "Home"], ["/movies", "Movies"], ["/favorites", "Favorites"]];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Search open hote hi input par focus
  useEffect(() => { if (searchOpen) inputRef.current?.focus(); }, [searchOpen]);

  // Movies page se bahar jaane par navbar search band + clear
  useEffect(() => {
    if (pathname !== "/movies") { setQ(""); setSearchOpen(false); }
  }, [pathname]);

  const handleChange = (e) => {
    const v = e.target.value;
    setQ(v);
    navigate(v.trim() ? `/movies?q=${encodeURIComponent(v)}` : "/movies", { replace: true });
  };

  const toggleSearch = () => { setSearchOpen(!searchOpen); setOpen(false); };
  const toggleMenu = () => { setOpen(!open); setSearchOpen(false); };

  return (
    <header className="navbar">
      <Link to="/" className="logo">Cine<span>Verse</span></Link>
      <nav className={open ? "nav-links open" : "nav-links"}>
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}>{label}</NavLink>
        ))}
      </nav>
      <div className="nav-actions">
        <form className={searchOpen ? "nav-search open" : "nav-search"} onSubmit={(e) => e.preventDefault()}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search movies..."
            value={q}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
          />
        </form>
        <button aria-label="Search" onClick={toggleSearch}>{searchOpen ? "✕" : "🔍"}</button>
        <button className="menu-btn" aria-label="Menu" onClick={toggleMenu}>{open ? "✕" : "☰"}</button>
      </div>
    </header>
  );
}
