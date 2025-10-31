-- =============================================
-- RESTAURANT DATABASE SETUP
-- =============================================

-- Kreiraj bazu (pokreni ovo kao postgres korisnik)
-- CREATE DATABASE restaurant_db;

-- Konektuj se na restaurant_db bazu, pa pokreni ostale komande:
-- \c restaurant_db

-- =============================================
-- EXTENSIONS
-- =============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TEST TABELA (za proveru konekcije)
-- =============================================

CREATE TABLE IF NOT EXISTS test_table (
  id SERIAL PRIMARY KEY,
  message VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO test_table (message) VALUES
  ('Backend i baza uspešno komuniciraju! ✅'),
  ('PostgreSQL radi kako treba! 🚀');

-- =============================================
-- PROVERA
-- =============================================

SELECT * FROM test_table;
