import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-item">
      <img src={item.image || '/placeholder-product.jpg'} alt={item.name} />
      <div>
        <h4>{item.name}</h4>
        <p>${item.price.toFixed(2)} × {item.quantity}</p>
        <button onClick={() => removeFromCart(item.product_id)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;