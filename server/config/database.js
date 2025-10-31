const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 20, // maksimalan broj konekcija u pool-u
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Event listener za uspešnu konekciju
pool.on('connect', () => {
  console.log('✅ Povezan sa PostgreSQL bazom');
});

// Event listener za greške
pool.on('error', (err) => {
  console.error('❌ Neočekivana greška sa bazom:', err);
  process.exit(-1);
});

// Test konekcije
const testConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('🕐 Database vreme:', result.rows[0].now);
    client.release();
  } catch (err) {
    console.error('❌ Greška pri povezivanju sa bazom:', err);
    throw err;
  }
};

module.exports = {
  pool,
  testConnection,
};
