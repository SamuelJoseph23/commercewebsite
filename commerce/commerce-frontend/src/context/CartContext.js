import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import api from '../services/api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const { data } = await api.get('/cart');
      setCartItems(data.items);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity) => {
    await api.post('/cart/add', { productId, quantity });
    await fetchCart();
  };

  const removeFromCart = async (productId) => {
    await api.delete(`/cart/remove/${productId}`);
    await fetchCart();
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        getCartTotal,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};