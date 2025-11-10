const { pool } = require('../config/database'); 

const MenuModel = { 
  async getAllMenuItems() {
    const query = `
      SELECT 
        mi.id, 
        mi.category_id,  
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
  },

  async updateMenuItem(id, {
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
      UPDATE menu_items 
      SET 
        category_id = $1,
        name = $2,
        description = $3,
        price = $4,
        image_url = $5,
        prep_time = $6,
        is_available = $7,
        is_vegetarian = $8,
        is_vegan = $9,
        is_gluten_free = $10,
        spicy_level = $11,
        calories = $12,
        popularity_score = $13,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $14
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
      popularity_score,
      id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  
  async deleteMenuItem(id) {
    const query = `
      DELETE FROM menu_items 
      WHERE id = $1 
      RETURNING *;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
};

module.exports = MenuModel;