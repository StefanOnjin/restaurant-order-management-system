const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { testConnection } = require('./config/database');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// ========== MIDDLEWARE ==========

// CORS - dozvoljava komunikaciju sa frontend-om
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true,
}));

// Body parser - parsira JSON zahteve
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statički fajlovi - uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ========== ROUTES ==========

app.use('/api', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server radi!',
    timestamp: new Date().toISOString(),
  });
}); 

app.get('/proba', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Proba uspesna!', 
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta ne postoji' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server greška:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Interna greška servera',
  });
});

// ========== SERVER START ==========

const startServer = async () => {
  try {
    // Testiraj konekciju sa bazom
    await testConnection();

    // Pokreni server
    app.listen(PORT, () => {
      console.log('=================================');
      console.log(`🚀 Server pokrenut na http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV}`);
      console.log('=================================');
    });
  } catch (error) {
    console.error('❌ Greška pri pokretanju servera:', error);
    process.exit(1);
  }
};

startServer();
