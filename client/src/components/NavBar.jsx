import { useState } from "react"; 
import { Link } from "react-router-dom" 
import { ShoppingCart } from "lucide-react" 
import './NavBar.css' 

function NavBar({user, cartCount}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false) 

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen); 

    return (
      <nav className="navbar">
        <div className="navbar-container">
          
          <Link to="/" className="navbar-logo">
            🍕 Pizzeria Stefan
          </Link>

          
          <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
            <Link to="/menu" className="navbar-link">Meni</Link>
            <Link to="/orders" className="navbar-link">Porudžbine</Link>

            {user?.role === "admin" && (
              <Link to="/dashboard" className="navbar-link">Admin Panel</Link>
            )}

            <Link to="/cart" className="navbar-cart">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </Link>

            {user ? (
              <>
                <span className="navbar-username">Zdravo, {user.name}</span>
                <button className="navbar-button logout">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-link">Prijava</Link>
                <Link to="/register" className="navbar-button register">
                  Registracija
                </Link>
              </>
            )}
          </div>

          
          <button className="navbar-toggle" onClick={toggleMenu}>
            ☰
          </button>
        </div>
      </nav>


    ); 

} 

export default NavBar 