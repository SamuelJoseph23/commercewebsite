import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" align="center" gutterBottom color="primary">
          Welcome to Our Store
        </Typography>

        <Typography variant="h6" align="center" sx={{ mb: 3 }}>
          Discover amazing products at great prices!
        </Typography>

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="body1" paragraph>
            From fashion to electronics, we have everything you need. Shop now and enjoy a seamless experience with secure checkout, fast delivery, and top-notch support.
          </Typography>
          <Typography variant="body1" paragraph>
            Start by creating an account or browse our products as a guest.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/register')}>
            Get Started
          </Button>
          <Button variant="outlined" color="primary" onClick={() => navigate('/products')}>
            Browse Products
          </Button>
          <Button variant="outlined" color="primary" onClick={() => navigate('/cart')}>
            Go to Cart
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
