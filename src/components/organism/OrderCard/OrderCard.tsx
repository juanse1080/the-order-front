import { Box, Chip, Paper, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import { Order, OrderPackaging, OrderStatus } from "../../../interfaces";

const orderStateNames = {
  [OrderStatus.PENDING]: "Pendiente",
  [OrderStatus.IN_PREPARATION]: "En preparación",
  [OrderStatus.PREPARED]: "Preparado",
  [OrderStatus.DELIVERED]: "Entregado",
};

const orderPackageNames = {
  [OrderPackaging.TO_GO]: "Para llevar",
  [OrderPackaging.EAT_HERE]: "Cenar en el lugar",
};

export type OrderCardProps = {
  order: Order;
} & PropsWithChildren;

const OrderCard = ({ children, order }: Readonly<OrderCardProps>) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        gap: 1,
        borderRadius: 5,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor:
          order.state_code === OrderStatus.PENDING
            ? "#fff3e0"
            : order.state_code === OrderStatus.IN_PREPARATION
            ? "#e3f2fd"
            : "#e8f5e9",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ mb: 0 }}>
        #{order.id} {order.buyer_name}
      </Typography>
      <Box display="flex" gap={1} alignItems="center">
        <Chip
          size="small"
          color="default"
          label={orderStateNames[order.state_code]}
        />
        <Chip
          size="small"
          color="info"
          label={orderPackageNames[order.package_code]}
        />
      </Box>

      <Box>
        {order.line_items.map((lineItem) => (
          <Box key={`order-${order.id}-item-${lineItem.id}`}>
            <Typography variant="body1" color="black">
              {lineItem.product.name} - {lineItem.qyt_ordened}
            </Typography>
          </Box>
        ))}
      </Box>
      {children}
    </Paper>
  );
};

export default OrderCard;
