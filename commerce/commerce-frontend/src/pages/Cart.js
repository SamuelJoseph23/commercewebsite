import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, loading, getCartTotal } = useContext(CartContext);

  if (loading) return <div>Loading cart...</div>;

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/products" className="btn">Browse Products</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ${getCartTotal().toFixed(2)}</h3>
            <Link to="/checkout" className="btn">Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;