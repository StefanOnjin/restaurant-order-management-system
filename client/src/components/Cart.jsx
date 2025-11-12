import { useCart } from "../context/CartContext"; 
import { Link } from "react-router-dom"; 
import "./Cart.css"; 

function Cart() {
    const {
        cart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        getCartTotal,
    } = useCart(); 

    if (cart.length === 0) {
        return (
        <div className="cart-empty-container">
            <div className="cart-empty">
            <h2>🛒 Vaša korpa je prazna</h2>
            <p>Dodajte neka ukusna jela!</p>
            <Link to="/" className="back-to-menu">
            Pogledajte naš meni
            </Link>
        </div>
        </div>
        ); 
    } 

    return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Vaša korpa</h2>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image_url || "./src/images/default_food.jpeg"}
              alt={item.name}
              className="cart-item-image"
            />

            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-item-category">{item.category_name}</p>
              <p className="cart-item-price">{item.price} RSD</p>
            </div>

            <div className="cart-item-quantity">
              <button 
                className="quantity-btn"
                onClick={() => decrementQuantity(item.id)}
              >
                -
              </button>
              <span className="quantity-value">{item.quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => incrementQuantity(item.id)}
              >
                +
              </button>
            </div>

            <div className="cart-item-subtotal">
              {item.price * item.quantity} RSD
            </div>

            <button
              className="cart-item-remove"
              onClick={() => removeFromCart(item.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Ukupno:</span>
          <span className="cart-total">{getCartTotal()} RSD</span>
        </div>
        
        <button className="checkout-button">
          Nastavi na poručivanje
        </button>
        
        <button className="clear-cart-button" onClick={clearCart}>
          Isprazni korpu
        </button>
      </div>
    </div>
  );    
} 

export default Cart; 