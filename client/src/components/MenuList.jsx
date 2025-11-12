import React from "react"; 
import { useEffect } from "react"; 
import { useState } from "react"; 
import "./MenuList.css"; 
import axios from "axios";
import { useCart } from "../context/CartContext"; 


const MenuList = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true); 
    const { addToCart } = useCart(); 
    
    useEffect(() => {
    const fetchMenu = async () => {
        try {
        const response = await axios.get("http://localhost:5000/api/menu");
        setMenuItems(response.data);
        } catch (err) {
        console.error("Greška pri učitavanju jela:", err);
        } finally {
        setLoading(false);
        }
    };

    fetchMenu();
    }, []);

    if (loading) {
    return <p className="loading-text">Učitavanje jela...</p>;
    }

    const handleAddToCart = (item) => {
        addToCart(item);
        alert(`${item.name} dodato u korpu!`); 
    }; 

    return (
    <div className="menu-container">
        <h2 className="menu-title">Naš Meni</h2>
        <div className="menu-grid">
        {menuItems.map((item) => (
            <div key={item.id} className="menu-card">
            <img
                src={item.image_url || './src/images/default_food.jpeg'}
                alt={item.name}
                className="menu-image"
            />
            <h3 className="menu-name">{item.name}</h3>
            <p className="menu-description">{item.description}</p>
            <p className="menu-price">{item.price} RSD</p>
            <p className="menu-category">{item.category_name}</p>
            <button className="menu-button"
                    onClick={() => handleAddToCart(item)}>
                        Dodaj u korpu
            </button>
            </div>
        ))}
        </div>
    </div>
    );
};

export default MenuList;