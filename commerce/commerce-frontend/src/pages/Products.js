import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Container,
  CircularProgress,
} from '@mui/material';
import api from '../services/api';
import { useCart } from '../contexts/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error('Error fetching products:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 6 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Products
      </Typography>

      <Grid container spacing={4}>
        {products.map((p) => (
          <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {p.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  ₹{Number(p.price).toFixed(2)}
                </Typography>
                {p.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {p.description}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => addToCart({ ...p, quantity: 1 })}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
