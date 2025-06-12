const pool = require('../config/db');

exports.getCart = async (req, res) => {
  try {
    const [cart] = await pool.query(
      `SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.price 
       FROM carts c
       JOIN cart_items ci ON c.id = ci.cart_id
       JOIN products p ON ci.product_id = p.id
       WHERE c.user_id = ?`,
      [req.user.id]
    );
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const [existingCart] = await pool.query('SELECT id FROM carts WHERE user_id = ?', [req.user.id]);
    let cartId = existingCart[0]?.id;

    if (!cartId) {
      const [result] = await pool.query('INSERT INTO carts (user_id) VALUES (?)', [req.user.id]);
      cartId = result.insertId;
    }

    const [existingItem] = await pool.query(
      'SELECT id FROM cart_items WHERE cart_id = ? AND product_id = ?',
      [cartId, productId]
    );

    if (existingItem.length > 0) {
      await pool.query(
        'UPDATE cart_items SET quantity = quantity + ? WHERE id = ?',
        [quantity || 1, existingItem[0].id]
      );
    } else {
      await pool.query(
        'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
        [cartId, productId, quantity || 1]
      );
    }

    res.json({ message: 'Item added to cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
};

exports.removeFromCart = async (req, res) => {
  const { cartItemId } = req.body;
  try {
    await pool.query('DELETE FROM cart_items WHERE id = ?', [cartItemId]);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to remove from cart' });
  }
};
