const express = require('express'); 
const router = express.Router(); 
const CategoryModel = require('../models/categoryModel'); 

// GET - sve AKTIVNE kategorije 
router.get('/', async (req, res) => {
    try {
        const categories = await CategoryModel.getAllCategories(); 
        res.json(categories);  
    } catch (err) {
        console.error('Greska pri ucitavanju kategorija: ', err); 
        res.status(500).json({ error: 'Greska pri ucitavanju kategorija!'}); 
    }
});


// GET - jedna kategorija po ID-ju 
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const category = await CategoryModel.findById(); 

        if (!category) {
            return res.status(404).json({ error: 'Kategorija nije pronadjena!'}); 
        }
    } catch (err) {
        console.error(' Greska:', err);
        res.status(500).json({ error: 'Greska na serveru' }); 
    }
}); 


// POST - Dodaj novu kategoriju (admin only)
router.post('/', async (req, res) => {
  try {
    const { name, description, image_url, display_order } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Ime kategorije je obavezno' });
    }

    // Proveri da li kategorija već postoji
    const existing = await CategoryModel.findByName(name);
    if (existing) {
      return res.status(400).json({ error: 'Kategorija sa tim imenom već postoji' });
    }
    
    const category = await CategoryModel.createCategory(
      name, 
      description, 
      image_url, 
      display_order
    );
    
    res.status(201).json(category);
  } catch (err) {
    console.error(' Greska pri dodavanju kategorije:', err);
    res.status(500).json({ error: 'Greska pri dodavanju kategorije' });
  }
});

// PUT - Izmeni kategoriju
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image_url, display_order, is_active } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Ime kategorije je obavezno' });
    }

    const category = await CategoryModel.updateCategory(
      id, 
      name, 
      description, 
      image_url, 
      display_order, 
      is_active
    );
    
    if (!category) {
      return res.status(404).json({ error: 'Kategorija nije pronađena' });
    }
    
    res.json(category);
  } catch (err) {
    console.error(' Greska pri izmeni kategorije:', err);
    res.status(500).json({ error: 'Greska pri izmeni kategorije' });
  }
}); 

// DELETE - Obriši kategoriju
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Prvo da vidim da li ima jela te kategorije, ako ima ne moze da se obrise tek tako
    const hasItems = await CategoryModel.hasMenuItems(id);
    if (hasItems) {
      return res.status(400).json({ 
        error: 'Ne možete obrisati kategoriju koja ima jela. Prvo obrišite ili premestite jela.' 
      });
    }
    
    const category = await CategoryModel.deleteCategory(id);
    
    if (!category) {
      return res.status(404).json({ error: 'Kategorija nije pronađena' });
    }
    
    res.json({ message: 'Kategorija uspešno obrisana', category });
  } catch (err) {
    console.error(' Greska pri brisanju kategorije:', err);
    res.status(500).json({ error: 'Greska pri brisanju kategorije' });
  }
});

module.exports = router; 