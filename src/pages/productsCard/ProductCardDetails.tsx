import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "./ProductsApi";

function ProductCardDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container sx={{ mt: "3rem" }}>
      <Typography gutterBottom variant="h5" component="div">
        {data.title}
      </Typography>
      <CardMedia
        sx={{ height: 400, objectFit: "contain" }}
        component="img"
        image={data.images}
        title={data.title}
      />
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
        <Fab variant="extended" size="medium" color="primary">
          <AddShoppingCartIcon sx={{ mr: 1 }} />
          Add to Basket
        </Fab>
      </Box>
    </Container>
  );
}

export default ProductCardDetails;
