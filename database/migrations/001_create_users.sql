CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    email VARCHAR(255) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    phone VARCHAR(50), 
    role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('customer', 'staff', 'admin')), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email); 
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role); 

COMMENT ON COLUMN users.role IS 'Uloga: customer, staff, admin'; 