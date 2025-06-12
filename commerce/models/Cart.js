const pool = require('../config/db');

class Cart {
  static async findOrCreateByUserId(userId) {
    let [rows] = await pool.query('SELECT * FROM carts WHERE user_id = ?', [userId]);
    
    if (rows.length === 0) {
      const [result] = await pool.query('INSERT INTO carts (user_id) VALUES (?)', [userId]);
      return { id: result.insertId, user_id: userId };
    }
    
    return rows[0];
  }

  static async getCartItems(cartId) {
    const [rows] = await pool.query(
      `SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.price, p.description 
       FROM cart_items ci 
       JOIN products p ON ci.product_id = p.id 
       WHERE ci.cart_id = ?`,
      [cartId]
    );
    return rows;
  }

  static async addItem(cartId, productId, quantity) {
    // Check if item already exists in cart
    const [existing] = await pool.query(
      'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?',
      [cartId, productId]
    );

    if (existing.length > 0) {
      // Update quantity if item exists
      await pool.query(
        'UPDATE cart_items SET quantity = quantity + ? WHERE cart_id = ? AND product_id = ?',
        [quantity, cartId, productId]
      );
    } else {
      // Add new item
      await pool.query(
        'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
        [cartId, productId, quantity]
      );
    }
  }

  static async removeItem(cartId, productId) {
    await pool.query(
      'DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?',
      [cartId, productId]
    );
  }

  static async clearCart(cartId) {
    await pool.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
  }
}

module.exports = Cart;