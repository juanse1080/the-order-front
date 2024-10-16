import { Grid2 } from "@mui/material";
import useSWR from "swr";
import { Content, OrderCard } from "../../components";
import { useRestaurantContext } from "../../contexts";
import { Order, Pagination } from "../../interfaces";

export function OrdersView() {
  const { restaurant } = useRestaurantContext();

  const { data, isLoading } = useSWR<Pagination<Order>>(
    `restaurant/${restaurant.id}/order`
  );

  const orders = data?.data || [];

  return (
    <Content loading={isLoading}>
      <Grid2 container spacing={4}>
        {orders.map((order) => (
          <Grid2 key={`order-${order.id}`} columns={{ xs: 12, sm: 6, md: 4 }}>
            <OrderCard order={order} />
          </Grid2>
        ))}
      </Grid2>
    </Content>
  );
}
