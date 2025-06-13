// src/pages/Cart.js
import React from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Box,
  Divider
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();

  // Total = sum(price * quantity)
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleQuantityChange = (item, qty) => {
    const quantity = parseInt(qty, 10);
    if (quantity <= 0) {
      removeFromCart(item.id);
    } else {
      // Reset with new quantity
      // Simple implementation: remove then re-add
      removeFromCart(item.id);
      addToCart({ ...item, quantity });
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">Your Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" onClick={() => removeFromCart(item.id)}>
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={item.name}
                    secondary={`₹${item.price.toFixed(2)}`}
                  />
                  <Box sx={{ ml: 2 }}>
                    <TextField
                      type="number"
                      inputProps={{ min: 1 }}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item, e.target.value)}
                      size="small"
                      sx={{ width: '60px' }}
                    />
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>

          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Typography variant="h6">
              Total: ₹{total.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 1 }}
              onClick={() => alert('Proceed to checkout')}
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
