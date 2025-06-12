const pool = require('../config/db');

class Product {
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  static async checkStock(productId, quantity) {
    const product = await this.findById(productId);
    return product && product.stock_quantity >= quantity;
  }

  static async updateStock(productId, quantity) {
    await pool.query(
      'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
      [quantity, productId]
    );
  }
}

module.exports = Product;