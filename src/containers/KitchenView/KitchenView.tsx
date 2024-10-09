import { Box, Button, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import { Content, OrderCard } from "../../components";
import { useRestaurantContext } from "../../contexts";
import { Order, OrderStatus } from "../../interfaces";
import { downloadTextFile, generateOrderCheck } from "../../utils/check";

export function KitchenView() {
  const { restaurant } = useRestaurantContext();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleStatusChange = async (
    orderId: number,
    newStatus: OrderStatus
  ) => {
    setOrders((prevOrders) => {
      const copy = [...prevOrders];
      const current = copy.find((order) => order.id === orderId);
      if (!current) return copy;

      if (newStatus === OrderStatus.PREPARED)
        downloadTextFile(
          `check-${current.id}.txt`,
          generateOrderCheck(current)
        );

      current.state_code = newStatus;
      return copy;
    });

    fetch(`${import.meta.env.VITE_API_URL}/order/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state_code: newStatus,
      }),
    })
      .then((response) => response.json())
      .then((data) => data);
  };

  useEffect(() => {
    const load = async () => {
      fetch(`${import.meta.env.VITE_API_URL}/restaurant/${restaurant.id}/order`)
        .then((response) => response.json())
        .then((data) => {
          setOrders(data.data);
          setLoading(false);
        });
    };

    load();
  }, []);

  return (
    <Content loading={loading}>
      <Grid2 container spacing={4}>
        {orders.map((order) => (
          <Grid2 key={`order-${order.id}`} columns={{ xs: 12, sm: 6, md: 4 }}>
            <OrderCard order={order}>
              <Box sx={{ marginTop: "auto" }}>
                {order.state_code === OrderStatus.PENDING && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: 5 }}
                    onClick={() =>
                      handleStatusChange(order.id, OrderStatus.IN_PREPARATION)
                    }
                  >
                    Iniciar preparación
                  </Button>
                )}
                {order.state_code === OrderStatus.IN_PREPARATION && (
                  <Button
                    color="secondary"
                    variant="contained"
                    sx={{ borderRadius: 5 }}
                    onClick={() =>
                      handleStatusChange(order.id, OrderStatus.PREPARED)
                    }
                  >
                    Marcar como preparado
                  </Button>
                )}
              </Box>
            </OrderCard>
          </Grid2>
        ))}
      </Grid2>
    </Content>
  );
}
