import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import api from '../services/api';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      await api.post('/orders/checkout');
      clearCart();
      navigate('/orders');
    } catch (error) {
      alert('Checkout failed');
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Total: ${getCartTotal().toFixed(2)}</p>
        <button onClick={handleCheckout}>Place Order</button>
      </div>
    </div>
  );
};

export default Checkout;