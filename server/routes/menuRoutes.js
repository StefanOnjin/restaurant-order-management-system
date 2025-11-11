const express = require('express'); 
const router = express.Router(); 
const MenuModel = require('../models/menuModel') 

// READ 

router.get('/', async (req, res) => {
    try {
        const items = await MenuModel.getAllMenuItems(); 
        res.json(items); 
    } catch (err) {
        console.error('Greska:', err); 
        res.status(500).json({ error: 'Greska pri ucitavanju jela'}); 
    }
}); 


router.post('/', async (req, res) => {
    try {
        const item = await MenuModel.createMenuItem(req.body); 
        res.status(201).json(item); 
    } catch (err) {
        console.error('Greska:', err); 
        res.status(500).json({ error: 'Greska pri dodavanju jela'}); 
    }
}); 

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedItem = await MenuModel.updateMenuItem(id, req.body); 

        if (!updatedItem) {
            return res.status(404).json({ error: 'Jelo nije pronadjeno'}); 
        } 

        res.json(updatedItem); 
    } catch (err) {
        console.error('Greska:', err); 
        res.status(500).json({ error: 'Greska pri izmeni jela' }); 
    }
}); 

router.delete('/:id', async (req, res) => {
    try {


    } catch (err) {
        console.error('Greska:', err); 
        res.status(500).json({ error: 'Greska pri brisanju jela' }); 
    } 
}); 

module.exports = router; 

