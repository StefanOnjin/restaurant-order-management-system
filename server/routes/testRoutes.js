const express = require('express'); 
const router = express.Router(); 
const { pool } = require('../config/database'); 

// =========================================
//  READ - Vrati sve redove
// =========================================
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM test_table ORDER BY id ASC'); 
    res.json(result.rows); 
  } catch (error) {
    console.error('❌ Greška pri čitanju iz baze!', error); 
    res.status(500).json({ error: 'Greška pri čitanju podataka iz baze.'}); 
  }
}); 

// =========================================
//  CREATE - Dodaj novi red
// =========================================
router.post('/', async (req, res) => {
  try {
    const { message } = req.body; 
    const result = await pool.query(
      'INSERT INTO test_table (message) VALUES ($1) RETURNING *',
      [message]
    ); 
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Greška pri dodavanju reda!', error);
    res.status(500).json({ error: 'Greška pri dodavanju reda u bazu.' });
  }
});

// =========================================
//  UPDATE - Izmeni postojeći red
// =========================================
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const result = await pool.query(
      'UPDATE test_table SET message = $1 WHERE id = $2 RETURNING *',
      [message, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Red nije pronađen.' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Greška pri ažuriranju reda!', error);
    res.status(500).json({ error: 'Greška pri ažuriranju u bazi.' });
  }
});

// =========================================
//  DELETE - Obriši red
// =========================================
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM test_table WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Red nije pronađen.' });
    }
    res.json({ message: 'Red uspešno obrisan.', deleted: result.rows[0] });
  } catch (error) {
    console.error('❌ Greška pri brisanju reda!', error);
    res.status(500).json({ error: 'Greška pri brisanju iz baze.' });
  }
});


module.exports = router; 