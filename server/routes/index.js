const express = require('express');
const router = express.Router();

/**
 * CENTRALNI ROUTER
 * Sve route-ove registrujemo ovde
 */

// Ovde ćeš dodavati nove route-ove kako projekat raste:

// const userRoutes = require('./userRoutes');
// router.use('/users', userRoutes);

// const menuRoutes = require('./menuRoutes');
// router.use('/menu', menuRoutes);

// const orderRoutes = require('./orderRoutes');
// router.use('/orders', orderRoutes);

const testRoutes = require('./testRoutes'); 
router.use('/test', testRoutes); 

// Default endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Restaurant API - Backend radi! 🚀',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
    },
  });
});


module.exports = router;
