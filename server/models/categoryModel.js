const { pool } = require('../config/database'); 

const CategoryModel = {
    async getAllCategories() {
        const result = await pool.query(`
            SELECT * FROM categories 
            WHERE is_active = true 
            ORDER BY display_order ASC
        `); 
        return result.rows; 
    }, 

    async getAllCategoriesAdmin() {
        const result = await pool.query(`
            SELECT * FROM categories 
            ORDER BY display_order ASC     
        `); 
        return result.rows; 
    }, 

    async findById(id) {
        const result = await pool.query(`
            SELECT * FROM categories where id = $1
        `, [id]); 
        return result.rows[0]; 
    }, 

    async findByName(name) {
        const result = await pool.query(
            'SELECT * FROM categories WHERE name = $1',
        [name]);
    return result.rows[0];
    }, 


    async createCategory(name, description, image_url, display_order = 0) {
        const result = await pool.query(`
            INSERT INTO categories (name, description, image_url, display_order)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [name, description, image_url, display_order]);
    return result.rows[0];
    },

    async updateCategory(id, name, description, image_url, display_order, is_active) {
        const result = await pool.query(`
            UPDATE categories 
            SET name = $1, 
                description = $2, 
                image_url = $3, 
                display_order = $4, 
                is_active = $5, 
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $6
            RETURNING *
        `, [name, description, image_url, display_order, is_active, id]);
    return result.rows[0];
    }, 

    async deleteCategory(id) {
        const result = await pool.query(
            'DELETE FROM categories WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    }, 

    async hasMenuItems(id) {
            const result = await pool.query(
            'SELECT COUNT(*) FROM menu_items WHERE category_id = $1',
            [id]
        );
        return parseInt(result.rows[0].count) > 0;
  }
}

module.exports = CategoryModel;