CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    
    user_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    
    subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
    delivery_fee DECIMAL(10, 2) DEFAULT 0 CHECK (delivery_fee >= 0),
    discount_amount DECIMAL(10, 2) DEFAULT 0 CHECK (discount_amount >= 0),
    tax_amount DECIMAL(10, 2) DEFAULT 0 CHECK (tax_amount >= 0),
    total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
    
    status VARCHAR(50) DEFAULT 'pending' CHECK (
        status IN ('pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled')
    ),
    
    payment_method VARCHAR(50) NOT NULL CHECK (
        payment_method IN ('cash', 'card', 'online')
    ),
    payment_status VARCHAR(50) DEFAULT 'unpaid' CHECK (
        payment_status IN ('paid', 'unpaid')
    ),
    paid_at TIMESTAMP,
    
    delivery_street VARCHAR(255) NOT NULL,
    delivery_city VARCHAR(100) NOT NULL,
    delivery_postal_code VARCHAR(20) NOT NULL,
    
    customer_notes TEXT,
    staff_notes TEXT,
    
    estimated_delivery_time TIMESTAMP,
    actual_delivery_time TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);