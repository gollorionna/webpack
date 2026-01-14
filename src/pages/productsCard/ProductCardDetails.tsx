import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '@/store/api';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { addToCart } from '@/store/cart';

export const ProductCardDetails = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : undefined;
  const { data: products, isLoading } = useGetProductByIdQuery(productId!);

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.entity);

  const isInCart = (id: number) => Boolean(cart?.products?.some((item) => item.id === id));

  if (isLoading || !products) return <p>Loading...</p>;

  return (
    <Container sx={{ mt: '3rem' }}>
      <Typography gutterBottom variant="h5" component="div">
        {products.title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          pt: 4,
          gap: 2,
        }}
      >
        <CardMedia
          sx={{ height: 400, objectFit: 'contain' }}
          component="img"
          image={products.images?.[0]}
          title={products.title}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography gutterBottom variant="h3" component="div">
            {products.price}$
          </Typography>
        </Stack>
        <Typography variant="body1">{products.description}</Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <Fab
          variant="extended"
          size="medium"
          color={isInCart(products.id) ? 'success' : 'primary'}
          aria-label="add to Cart"
          onClick={() =>
            dispatch(
              addToCart({
                id: products.id,
                title: products.title,
                price: products.price,
                thumbnail: products.thumbnail,
              })
            )
          }
        >
          <AddShoppingCartIcon sx={{ mr: 1 }} />
          Add to Cart
        </Fab>
      </Box>
    </Container>
  );
};
