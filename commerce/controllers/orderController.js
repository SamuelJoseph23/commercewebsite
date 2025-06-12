const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.checkout = async (req, res) => {
  try {
    const cart = await Cart.findOrCreateByUserId(req.user.id);
    const cartItems = await Cart.getCartItems(cart.id);
    
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    // Calculate total amount and check stock
    let totalAmount = 0;
    for (const item of cartItems) {
      totalAmount += item.price * item.quantity;
      
      const hasStock = await Product.checkStock(item.product_id, item.quantity);
      if (!hasStock) {
        return res.status(400).json({ 
          message: `Insufficient stock for product: ${item.name}` 
        });
      }
    }
    
    // Create order
    const orderId = await Order.create(req.user.id, totalAmount);
    
    // Add order items and update product stock
    for (const item of cartItems) {
      await Order.addOrderItem(orderId, item.product_id, item.quantity, item.price);
      await Product.updateStock(item.product_id, item.quantity);
    }
    
    // Clear cart
    await Cart.clearCart(cart.id);
    
    res.json({ 
      message: 'Order created successfully',
      orderId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.findByUserId(req.user.id);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.getOrderDetails(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Verify the order belongs to the user
    if (order.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};