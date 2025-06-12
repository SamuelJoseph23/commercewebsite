import { useEffect, useState } from 'react';
import api from '../services/api';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');

  const fetchCart = async () => {
    try {
      const response = await api.get('/cart');
      setCartItems(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load cart');
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await api.post('/cart/remove', { cartItemId });
      setCartItems((items) => items.filter(item => item.id !== cartItemId));
    } catch (err) {
      console.error(err);
      setError('Failed to remove item');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {error && <div className="error">{error}</div>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <strong>{item.name}</strong> — ₹{item.price} × {item.quantity}
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
