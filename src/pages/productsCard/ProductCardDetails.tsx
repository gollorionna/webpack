import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "./ProductsApi";
import { useCart } from "@/context/CartContext";

function ProductCardDetails() {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : undefined;
  const { data, isLoading } = useGetProductByIdQuery(productId!);
  const { addItem } = useCart();

  if (isLoading || !data) return <p>Loading...</p>;

  return (
    <Container sx={{ mt: "3rem" }}>
      <Typography gutterBottom variant="h5" component="div">
        {data.title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          pt: 4,
          gap: 2,
        }}
      >
        {data.images?.map((img: string, index: number) => (
          <CardMedia
            key={index}
            sx={{ height: 400, objectFit: "contain" }}
            component="img"
            image={img}
            title={data.title}
          />
        ))}
      </Box>

      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography gutterBottom variant="h3" component="div">
            {data.price}$
          </Typography>
        </Stack>
        <Typography variant="body1">{data.description}</Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add to Cart"
          onClick={() =>
            addItem({
              id: data.id,
              title: data.title,
              price: data.price,
              thumbnail: data.thumbnail,
            })
          }
        >
          <AddShoppingCartIcon sx={{ mr: 1 }} />
          Add to Cart
        </Fab>
      </Box>
    </Container>
  );
}

export default ProductCardDetails;
