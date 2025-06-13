import React from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  const handleQuantityChange = (item, qty) => {
    const quantity = parseInt(qty, 10);
    if (quantity <= 0 || isNaN(quantity)) {
      removeFromCart(item.id);
    } else {
      removeFromCart(item.id);
      addToCart({ ...item, quantity });
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <Box key={item.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography variant="h6">{item.name}</Typography>
              <Typography>₹{Number(item.price).toFixed(2)} each</Typography>
              <TextField
                type="number"
                label="Quantity"
                inputProps={{ min: 1 }}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item, e.target.value)}
                size="small"
                sx={{ mt: 1, width: '100px' }}
              />
              <Button
                variant="outlined"
                color="secondary"
                sx={{ ml: 2 }}
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </Box>
          ))}

          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Typography variant="h6">
              Total: ₹{total.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => alert('Proceeding to checkout...')}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;
