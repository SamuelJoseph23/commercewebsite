const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOrCreateByUserId(req.user.id);
    const items = await Cart.getCartItems(cart.id);
    
    res.json({
      cartId: cart.id,
      items
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Check product stock
    const hasStock = await Product.checkStock(productId, quantity);
    if (!hasStock) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    
    const cart = await Cart.findOrCreateByUserId(req.user.id);
    await Cart.addItem(cart.id, productId, quantity);
    
    res.json({ message: 'Item added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOrCreateByUserId(req.user.id);
    
    await Cart.removeItem(cart.id, productId);
    
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOrCreateByUserId(req.user.id);
    await Cart.clearCart(cart.id);
    
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};