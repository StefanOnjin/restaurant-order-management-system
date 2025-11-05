const { pool } = require('../config/database');

const UserModel = {
  
  async createUser(name, email, hashedPassword, phone, role = 'customer') {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, phone, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, role, phone`,
      [name, email, hashedPassword, phone, role]
    );
    return result.rows[0];
  },

  
  async findByEmail(email) {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0];
  },

  
  async findById(id) {
    const result = await pool.query(
      `SELECT id, name, email, role, phone FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },

  
  async getAllUsers() {
    const result = await pool.query(
      `SELECT id, name, email, role, phone FROM users ORDER BY id ASC`
    );
    return result.rows;
  }
};

module.exports = UserModel;
