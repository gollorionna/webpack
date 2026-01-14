import Container from "@mui/material/Container";
import {ProductCard} from "./ProductCard";

export const ProductCardPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <ProductCard />
    </Container>
  );
}