# Repositories

**Data Access Layer** - SAMO komunikacija sa bazom.

Ovde dodaješ fajlove koji komuniciraju sa PostgreSQL bazom.

## Pravila:
- ❌ NEMA biznis logike
- ✅ SAMO SQL upiti
- ✅ Vraća sirove podatke iz baze

## Primer strukture:

```javascript
const { pool } = require('../config/database');

const userRepository = {
  async findAll() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create(userData) {
    const { name, email, password } = userData;
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    return result.rows[0];
  },
};

module.exports = userRepository;
```
