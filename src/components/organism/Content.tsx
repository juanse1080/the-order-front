import {
  AppBar,
  Avatar,
  Box,
  CircularProgress,
  Link as MuiLink,
  Toolbar,
  Typography,
} from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useRestaurantContext } from "../../contexts";

export type ContentProps = {
  loading?: boolean;
  appBar?: ReactNode;
} & PropsWithChildren;

const Content = ({ children, appBar, loading }: Readonly<ContentProps>) => {
  const { restaurant } = useRestaurantContext();

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Avatar alt="Remy Sharp" src={restaurant?.logo} sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "white" }}
          >
            The Order - {restaurant?.name}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Box display="flex" gap={2} alignItems="center">
            <MuiLink
              to="/orders"
              component={Link}
              sx={{ textDecoration: "none", color: "white" }}
            >
              Ordenes
            </MuiLink>
            <MuiLink
              to="/kitchen"
              component={Link}
              sx={{ textDecoration: "none", color: "white" }}
            >
              Cocina
            </MuiLink>
            {appBar}
          </Box>
        </Toolbar>
      </AppBar>
      <Box m={4}>
        {loading ? (
          <Box
            display="flex"
            height="100vh"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          children
        )}
      </Box>
    </>
  );
};

export default Content;
