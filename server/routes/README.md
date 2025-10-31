# Routes

**API Endpoints** - Definicije ruta.

Ovde dodaješ fajlove koji definišu API endpoint-e i povezuju ih sa service-ima.

## Pravila:
- ✅ Definiši rute (GET, POST, PUT, DELETE)
- ✅ Pozovi odgovarajući service
- ✅ Grupiši povezane rute zajedno

## Primer strukture:

```javascript
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// GET /api/users
router.get('/', userService.getAllUsers);

// GET /api/users/:id
router.get('/:id', userService.getUserById);

// POST /api/users
router.post('/', userService.createUser);

// PUT /api/users/:id
router.put('/:id', userService.updateUser);

// DELETE /api/users/:id
router.delete('/:id', userService.deleteUser);

module.exports = router;
```

## Kako registrovati rute:

U `routes/index.js`:
```javascript
const userRoutes = require('./userRoutes');
router.use('/users', userRoutes);
```
