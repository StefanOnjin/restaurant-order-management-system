const { pool } = require('../config/database'); 

const MenuModel = { 
    async getAllMenuItems() {
    const query = `
      SELECT 
        mi.id, 
        mi.name, 
        mi.description, 
        mi.price, 
        mi.image_url, 
        mi.prep_time, 
        mi.is_available, 
        mi.is_vegetarian, 
        mi.is_vegan, 
        mi.is_gluten_free, 
        mi.spicy_level, 
        mi.calories, 
        mi.popularity_score, 
        c.name AS category_name
      FROM menu_items mi
      JOIN categories c ON mi.category_id = c.id
      WHERE mi.is_available = true
      ORDER BY mi.popularity_score DESC, mi.id ASC;
    `;
    const result = await pool.query(query);
    return result.rows;
  },

    async createMenuItem({
    category_id,
    name,
    description,
    price,
    image_url,
    prep_time,
    is_available,
    is_vegetarian,
    is_vegan,
    is_gluten_free,
    spicy_level,
    calories,
    popularity_score
  }) {
    const query = `
      INSERT INTO menu_items (
        category_id, name, description, price, image_url, prep_time,
        is_available, is_vegetarian, is_vegan, is_gluten_free, spicy_level, calories, popularity_score
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *;
    `;

    const values = [
      category_id,
      name,
      description,
      price,
      image_url,
      prep_time,
      is_available,
      is_vegetarian,
      is_vegan,
      is_gluten_free,
      spicy_level,
      calories,
      popularity_score
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }
};

module.exports = MenuModel;