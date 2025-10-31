# Database Setup

PostgreSQL baza podataka za restaurant aplikaciju.

## 📦 Instalacija PostgreSQL-a

1. **Preuzmi PostgreSQL:**
   - Windows: https://www.postgresql.org/download/windows/
   - Tokom instalacije zapamti **password** za `postgres` korisnika
   - Default port je **5432**

2. **Proveri instalaciju:**
```bash
psql --version
```

## 🗄️ Kreiranje Baze

### Opcija 1: Ručno preko psql-a

```bash
# Otvori PostgreSQL CLI
psql -U postgres

# Kreiraj bazu
CREATE DATABASE restaurant_db;

# Konektuj se na bazu
\c restaurant_db

# Pokreni setup script
\i setup.sql

# Proveri tabele
\dt

# Izađi
\q
```

### Opcija 2: Jednolinjski command

```bash
psql -U postgres -c "CREATE DATABASE restaurant_db;"
```

## ✅ Provera Konekcije

Nakon kreiranja baze, podesi `.env` fajl u `server/` folderu:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tvoj_password
DB_NAME=restaurant_db
```

## 📁 Struktura

```
database/
├── setup.sql          # Inicijalni setup
├── migrations/        # Migracije (buduće tabele)
└── seeds/             # Seed data
```

## 🔧 Korisne PostgreSQL Komande

```bash
# Listaj sve baze
\l

# Konektuj se na bazu
\c restaurant_db

# Listaj sve tabele
\dt

# Prikaži strukturu tabele
\d table_name

# Izvrši SQL fajl
\i path/to/file.sql

# Izađi iz psql-a
\q
```
