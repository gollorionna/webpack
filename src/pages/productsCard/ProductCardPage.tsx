import Container from "@mui/material/Container";
import ProductCard from "./ProductCard";
import "@/pages/productsCard/theme/ProductCard.scss";

export default function ProductCardPage() {
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