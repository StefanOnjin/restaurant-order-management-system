const express = require('express');
const router = express.Router();


 const userRoutes = require('./userRoutes');
 router.use('/users', userRoutes);


//const menuRoutes = require('./menuRoutes');
//router.use('/menu', menuRoutes);



const testRoutes = require('./testRoutes'); 
router.use('/test', testRoutes); 


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
