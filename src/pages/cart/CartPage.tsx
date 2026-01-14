import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { CartItem } from './CartItem';
import type { ICartItem } from '@/store/types';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { clearCart, removeFromCart, addToCart } from '@/store/cart';

export const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.entity);

  const items = cart?.products ?? [];
  const totalItems = cart?.totalQuantity ?? 0;
  const totalPrice = cart?.total ?? 0;
  const isEmpty = items.length === 0;

  if (!cart || isEmpty) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingCartIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Cart is empty
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Add products to place an order
        </Typography>
        <Button component={Link} to="/products" variant="contained" size="large">
          Go to products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Cart
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item: ICartItem) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => dispatch(removeFromCart(item.id))}
              onUpdateQuantity={(qty: number) => dispatch(addToCart({ ...item, quantity: qty }))}
            />
          ))}

          <Button
            variant="outlined"
            color="error"
            onClick={() => dispatch(clearCart())}
            sx={{ mt: 2 }}
          >
            Clear cart
          </Button>
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: 3,
            minWidth: 300,
            height: 'fit-content',
            position: { md: 'sticky' },
            top: { md: 20 },
          }}
        >
          <Typography variant="h5" gutterBottom>
            Total
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">Products ({totalItems} pcs.)</Typography>
            <Typography>${totalPrice.toFixed(2)}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">Delivery</Typography>
            <Typography color="success.main">Free</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">To pay</Typography>
            <Typography variant="h6" color="primary">
              ${totalPrice.toFixed(2)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ bgcolor: 'green', '&:hover': { bgcolor: 'darkgreen' } }}
          >
            Place order
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};
