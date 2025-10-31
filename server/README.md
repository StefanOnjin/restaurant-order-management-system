# Restaurant Backend API

Backend za restaurant aplikaciju - Node.js + Express + PostgreSQL

## 📁 Struktura Projekta

```
server/
├── config/          # Konfiguracija (database, env)
├── repositories/    # Data Access Layer (SQL upiti)
├── services/        # Business Logic Layer (biznis logika)
├── routes/          # API endpoints (rute)
├── models/          # Database modeli/schema
├── lib/             # Helper funkcije
├── data/            # Seed data, SQL skripte
├── uploads/         # Upload-ovani fajlovi
├── .env             # Environment varijable (NE commit-ovati!)
├── .gitignore       # Git ignore fajl
├── package.json     # Dependencies
└── server.js        # Entry point
```

## 🚀 Instalacija

1. **Instaliraj dependencije:**
```bash
cd server
npm install
```

2. **Podesi .env fajl:**
Kopiraj `.env` i podesi svoje vrednosti:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tvoj_password
DB_NAME=restaurant_db
```

3. **Kreiraj PostgreSQL bazu:**
```bash
# Otvori psql
psql -U postgres

# Kreiraj bazu
CREATE DATABASE restaurant_db;

# Izađi
\q
```

4. **Pokreni server:**
```bash
# Development mode (sa auto-reload)
npm run dev

# Production mode
npm start
```

## 📊 API Endpoints

Server će biti pokrenut na: `http://localhost:5000`

### Health Check
- `GET /health` - Provera da li server radi

## 🏗️ Kako Radi Arhitektura

### Flow: Route → Service → Repository → Database

**1. Route (routes/)** - Definiše endpoint
```javascript
router.get('/users/:id', userService.getUserById);
```

**2. Service (services/)** - Biznis logika + validacija
```javascript
const getUserById = async (req, res) => {
  const userId = req.params.id;
  if (!userId) return res.status(400).json({ error: 'ID obavezan' });

  const user = await userRepository.findById(userId);
  res.json(user);
};
```

**3. Repository (repositories/)** - Komunikacija sa bazom
```javascript
const findById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};
```

## 📦 Dependencies

- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment varijable
- **pg** - PostgreSQL klijent
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT autentikacija
- **express-validator** - Validacija
- **multer** - File upload

## 🛠️ Development

```bash
npm run dev    # Pokreni sa nodemon (auto-reload)
npm start      # Pokreni normalno
```
