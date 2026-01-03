// pages/basket/BasketItem.tsx
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import type { IBasketItem } from "@/hooks/useBasket";

interface BasketItemProps {
  item: IBasketItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

function BasketItem({ item, onUpdateQuantity, onRemove }: BasketItemProps) {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        gap: 2,
        mb: 2,
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, objectFit: "cover", borderRadius: 1 }}
        image={item.thumbnail}
        alt={item.title}
      />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${item.price.toFixed(2)} за шт.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          size="small"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        >
          <RemoveIcon />
        </IconButton>

        <Typography sx={{ minWidth: 40, textAlign: "center" }}>
          {item.quantity}
        </Typography>

        <IconButton
          size="small"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Typography variant="h6" sx={{ minWidth: 80, textAlign: "right" }}>
        ${(item.price * item.quantity).toFixed(2)}
      </Typography>

      <IconButton color="error" onClick={() => onRemove(item.id)}>
        <DeleteIcon />
      </IconButton>
    </Card>
  );
}

export default BasketItem;
