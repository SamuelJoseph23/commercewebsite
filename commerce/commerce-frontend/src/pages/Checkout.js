import React from 'react';
import { useCart } from '../contexts/CartContext';

const Checkout = () => {
  const { cartItems } = useCart();

  const handleCheckout = () => {
    alert('Checkout functionality coming soon!');
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart to checkout.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.name} - ₹{item.price}</p>
            </div>
          ))}
          <button onClick={handleCheckout}>Confirm Order</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
