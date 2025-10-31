# Models

**Database Schema** - SQL schema i migracije.

Ovde držiš SQL fajlove za kreiranje tabela i njihovu strukturu.

## Primer strukture:

### users.sql
```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### menu_items.sql
```sql
CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50),
  image_url VARCHAR(255),
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Kako pokrenuti SQL fajlove:

```bash
# U psql-u
\i server/models/users.sql
\i server/models/menu_items.sql
```

Ili programski iz Node.js-a:
```javascript
const fs = require('fs');
const { pool } = require('../config/database');

const runMigration = async (filename) => {
  const sql = fs.readFileSync(`./models/${filename}`, 'utf8');
  await pool.query(sql);
};
```
