import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <img src={product.image || '/placeholder-product.jpg'} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <p className="description">{product.description}</p>
      <button 
        onClick={() => addToCart(product.id, 1)}
        className="add-to-cart-btn"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;