// pages/basket/BasketPage.tsx
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import BasketItem from "./BasketItem";
import { useBasket, type IBasketItem } from "@/context/BasketContext";

function BasketPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearBasket,
    totalItems,
    totalPrice,
    isEmpty,
  } = useBasket();

  if (isEmpty) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <ShoppingCartIcon
          sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          Корзина пуста
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Добавьте товары, чтобы оформить заказ
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          size="large"
        >
          Перейти к товарам
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Корзина
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Список товаров */}
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item: IBasketItem) => (
            <BasketItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}

          <Button
            variant="outlined"
            color="error"
            onClick={clearBasket}
            sx={{ mt: 2 }}
          >
            Очистить корзину
          </Button>
        </Box>

        {/* Итого */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            minWidth: 300,
            height: "fit-content",
            position: { md: "sticky" },
            top: { md: 20 },
          }}
        >
          <Typography variant="h5" gutterBottom>
            Итого
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography color="text.secondary">
              Товары ({totalItems} шт.)
            </Typography>
            <Typography>${totalPrice.toFixed(2)}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography color="text.secondary">Доставка</Typography>
            <Typography color="success.main">Бесплатно</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6">К оплате</Typography>
            <Typography variant="h6" color="primary">
              ${totalPrice.toFixed(2)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ bgcolor: "green", "&:hover": { bgcolor: "darkgreen" } }}
          >
            Оформить заказ
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default BasketPage;
