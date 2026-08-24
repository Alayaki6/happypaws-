import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand">
          🐾 HappyPaws
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dogs">Dogs</Link>
          <Link to="/cats">Cats</Link>
          <Link to="/other-pets">Other Pets</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
