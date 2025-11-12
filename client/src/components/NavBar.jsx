import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from "../context/CartContext"; 
import './NavBar.css';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartCount } = useCart(); 

  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartCount = getCartCount(); 

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🍕 Pizzeria Stefan
        </Link>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/menu" className="navbar-link">
            Meni
          </Link>
          <Link to="/orders" className="navbar-link">
            Porudžbine
          </Link>

          {user?.role === 'admin' && (
            <Link to="/dashboard" className="navbar-link">
              Admin Panel
            </Link>
          )}

          <Link to="/cart" className="navbar-cart">
            <ShoppingCart size={20} />
              {cartCount > 0 && ( 
                <span className="cart-count">{cartCount}</span>
              )}
          </Link>

          {isAuthenticated ? (
            <>
              <span className="navbar-username">Zdravo, {user.name}</span>
              <button className="navbar-button logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Prijava
              </Link>
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

export default NavBar;