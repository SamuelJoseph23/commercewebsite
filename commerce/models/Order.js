const pool = require('../config/db');

class Order {
  static async create(userId, totalAmount) {
    const [result] = await pool.query(
      'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
      [userId, totalAmount]
    );
    return result.insertId;
  }

  static async addOrderItem(orderId, productId, quantity, price) {
    await pool.query(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
      [orderId, productId, quantity, price]
    );
  }

  static async findByUserId(userId) {
    const [rows] = await pool.query('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return rows;
  }

  static async getOrderDetails(orderId) {
    const [order] = await pool.query('SELECT * FROM orders WHERE id = ?', [orderId]);
    const [items] = await pool.query(
      `SELECT oi.quantity, oi.price, p.name, p.description 
       FROM order_items oi 
       JOIN products p ON oi.product_id = p.id 
       WHERE oi.order_id = ?`,
      [orderId]
    );
    return { ...order[0], items };
  }
}

module.exports = Order;