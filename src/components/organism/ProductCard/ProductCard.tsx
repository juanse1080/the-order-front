import { Box, Card, CardMedia, Typography } from "@mui/material";
import { Product } from "../../../interfaces";

export type ProductCardProps = {
  product: Product;
  children?: React.ReactNode;
};

function ProductCard({ product, children }: ProductCardProps) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 5 }}>
      <CardMedia
        component="img"
        height="150"
        image={product.image}
        alt={product.name}
      />
      <Box
        sx={{
          p: 2,
          gap: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price.toFixed(2)}
        </Typography>
        {children}
      </Box>
    </Card>
  );
}

export default ProductCard;
