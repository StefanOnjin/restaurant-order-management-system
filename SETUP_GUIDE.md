# 🍽️ Restaurant - Setup Guide

Kompletno uputstvo za postavljanje full-stack restaurant aplikacije.

---

## 📋 Struktura Projekta

```
restaurant/
├── client/              # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/              # Backend (Node.js + Express)
│   ├── config/          # Konfiguracija (database, env)
│   ├── repositories/    # Data Access Layer
│   ├── services/        # Business Logic Layer
│   ├── routes/          # API endpoints
│   ├── models/          # Database schema
│   ├── lib/             # Helper funkcije
│   ├── data/            # Seed data
│   ├── uploads/         # Upload-ovani fajlovi
│   └── server.js        # Entry point
│
├── database/            # PostgreSQL setup
│   └── setup.sql
│
└── .env.example         # Environment template
```

---

## 🚀 KORAK 1: Instalacija PostgreSQL-a

### Windows:

1. **Preuzmi instalaciju:**
   - https://www.postgresql.org/download/windows/
   - Preuzmi PostgreSQL 15 ili 16

2. **Instaliraj:**
   - Tokom instalacije **zapamti password** za `postgres` korisnika
   - Port: `5432` (default)
   - Locale: English, United States

3. **Dodaj u PATH** (ako nije automatski):
   - Windows Search → "Environment Variables"
   - System Variables → Path → Edit
   - Dodaj: `C:\Program Files\PostgreSQL\16\bin`

4. **Proveri instalaciju:**
   ```bash
   psql --version
   # Trebalo bi: psql (PostgreSQL) 16.x
   ```

---

## 🗄️ KORAK 2: Kreiranje Baze Podataka

### Metoda 1: GUI (pgAdmin)

1. Otvori **pgAdmin 4** (instaliran sa PostgreSQL-om)
2. Konektuj se (password koji si postavio)
3. Desni klik na "Databases" → Create → Database
4. Database name: `restaurant_db`
5. Save

### Metoda 2: CLI (psql)

```bash
# Otvori Command Prompt ili PowerShell

# Konektuj se kao postgres korisnik
psql -U postgres

# Kreiraj bazu
CREATE DATABASE restaurant_db;

# Konektuj se na novu bazu
\c restaurant_db

# Proveri da li si povezan
SELECT current_database();

# Izađi
\q
```

---

## ⚙️ KORAK 3: Podešavanje Backend-a

### 1. Podesi `.env` fajl

```bash
cd server
```

Otvori `server/.env` i podesi:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tvoj_password_ovde  # ⚠️ PROMENI OVO!
DB_NAME=restaurant_db

JWT_SECRET=super_secret_key_change_this
```

### 2. Pokreni backend

```bash
# Već si instalirao dependencije (npm install je izvršeno)

# Pokreni server sa auto-reload
npm run dev
```

**Očekivani output:**
```
✅ Povezan sa PostgreSQL bazom
🕐 Database vreme: 2025-10-23T...
=================================
🚀 Server pokrenut na http://localhost:5000
📊 Environment: development
=================================
```

### 3. Testiraj backend

Otvori browser:
- http://localhost:5000/health → `{"status":"OK"}`
- http://localhost:5000/api → Trebao bi da vidiš JSON odgovor

---

## 🎨 KORAK 4: Pokretanje Frontend-a

```bash
# Otvori NOVI terminal/command prompt
cd client

# Pokreni frontend (Vite dev server)
npm run dev
```

**Očekivani output:**
```
VITE v7.1.7  ready in XXX ms

➜  Local:   http://localhost:5173/
```

---

## ✅ KORAK 5: Provera Komunikacije

### Test 1: Backend zdravlje
```bash
curl http://localhost:5000/health
```
Trebalo bi: `{"status":"OK",...}`

### Test 2: Frontend → Backend komunikacija

U `client/src/App.jsx` dodaj:

```jsx
import { useEffect, useState } from 'react';

function App() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:5000/health')
      .then(res => res.json())
      .then(data => setStatus(data.message))
      .catch(err => setStatus('❌ Greška: ' + err.message));
  }, []);

  return (
    <div>
      <h1>Restaurant App</h1>
      <p>Backend status: {status}</p>
    </div>
  );
}

export default App;
```

Otvori http://localhost:5173/ → Trebalo bi da vidiš "Backend status: Server radi!"

---

## 🎯 FINALNA PROVERA - SVE RADI! ✅

1. ✅ **PostgreSQL** radi i baza `restaurant_db` je kreirana
2. ✅ **Backend** radi na http://localhost:5000
3. ✅ **Frontend** radi na http://localhost:5173
4. ✅ **Komunikacija** frontend ↔ backend funkcioniše
5. ✅ **Database konekcija** backend ↔ PostgreSQL radi

---

## 📊 Arhitektura Flow

```
Frontend (React)
    ↓ HTTP Request
Backend Server (Express)
    ↓
Route → Service → Repository
                    ↓
              PostgreSQL Database
```

---

## 🐛 Troubleshooting

### Problem: PostgreSQL ne radi

**Rešenje:**
```bash
# Windows Services
Win + R → services.msc → Potraži "postgresql-x64-16"
→ Desni klik → Start
```

### Problem: Backend ne može da se poveže sa bazom

**Rešenje:**
1. Proveri `server/.env` → password mora biti tačan
2. Proveri da li PostgreSQL radi (vidi gore)
3. Proveri da li baza postoji:
   ```bash
   psql -U postgres -l
   # Trebalo bi da vidiš restaurant_db
   ```

### Problem: CORS greška

**Rešenje:**
- Backend već ima CORS podešen za `http://localhost:5173`
- Ako koristiš drugi port, promeni u `server/server.js`

---

## 📚 Sledeći Koraci

Nakon što sve radi, možeš:

1. **Kreirati database schema** (tabele)
   - `server/models/` → SQL fajlovi za tabele

2. **Implementirati autentikaciju**
   - JWT, bcrypt već instalirani

3. **Kreirati API endpoint-e**
   - Users, Menu, Orders, itd.

4. **Frontend komponente**
   - Login, Register, Menu prikaz, Korpa

---

## 🆘 Pomoć

Ako imaš problema:
1. Proveri console logove (frontend i backend)
2. Proveri PostgreSQL logove
3. Proveri da li svi portovi (5000, 5173, 5432) nisu blokirani

---

✅ **Setup je završen! Sve je spremno za razvoj aplikacije!** 🚀
