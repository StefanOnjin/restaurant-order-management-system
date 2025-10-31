# Services

**Business Logic Layer** - Biznis logika i validacija.

Ovde dodaješ fajlove sa biznis logikom koja koristi repositories.

## Pravila:
- ✅ Biznis logika i validacija
- ✅ Koristi repositories za pristup bazi
- ✅ Vraća odgovore klijentu (res.json)

## Primer strukture:

```javascript
const userRepository = require('../repositories/userRepository');
const responseHelper = require('../lib/responseHelper');

const userService = {
  async getAllUsers(req, res) {
    try {
      const users = await userRepository.findAll();
      return responseHelper.success(res, users, 'Korisnici uspešno preuzeti');
    } catch (error) {
      return responseHelper.error(res, 'Greška pri preuzimanju korisnika', 500, error);
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;

      // Validacija
      if (!id) {
        return responseHelper.validationError(res, { id: 'ID je obavezan' });
      }

      const user = await userRepository.findById(id);

      if (!user) {
        return responseHelper.notFound(res, 'Korisnik nije pronađen');
      }

      return responseHelper.success(res, user);
    } catch (error) {
      return responseHelper.error(res, 'Greška pri preuzimanju korisnika', 500, error);
    }
  },
};

module.exports = userService;
```
