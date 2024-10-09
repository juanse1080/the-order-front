import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { shoppingCartContext, useRestaurantContext } from '../../contexts';
import { useState } from 'react';

function YourShoppingCart() {
  const [loading, setLoading] = useState(false);
  const { restaurant } = useRestaurantContext();

  const {
    lineItems,
    removeLineItem,
    updateQuantity,
    takeaway,
    customerName,
    setTakeaway,
    reset,
    setCustomerName
  } = shoppingCartContext();

  const calculateTotal = () => {
    return lineItems.reduce(
      (total, item) => total + item.product.price * item.qyt_ordened,
      0
    );
  };

  const handleSubmitOrder = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/restaurant/${restaurant.id}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        buyer_name: customerName,
        package_code: takeaway ? 'TO_GO' : 'EAT_HERE',
        line_items: lineItems.map((item) => ({
          product_id: item.product.id,
          qyt_ordened: item.qyt_ordened,
          comments: item.comments ?? ''
        }))
      })
    })
      .then((response) => response.json())
      .then((data) => {
        reset();
        setLoading(false);
      });
  };

  return (
    <Card sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Tu pedido
      </Typography>
      {lineItems.map((item, index) => (
        <Box
          key={`card-${item.product.id}`}
          sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
        >
          <CardMedia
            component="img"
            sx={{ width: 50, height: 50, mr: 2 }}
            image={item.product.image}
            alt={item.product.name}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">
              {item.product.name} - $
              {(item.product.price * item.qyt_ordened).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.comments && `Nota: ${item.comments}`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => updateQuantity(index, item.qyt_ordened - 1)}
            >
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ mx: 1 }}>{item.qyt_ordened}</Typography>
            <IconButton
              onClick={() => updateQuantity(index, item.qyt_ordened + 1)}
            >
              <AddIcon />
            </IconButton>
            <IconButton onClick={() => removeLineItem(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
      <Typography variant="h6" sx={{ mt: 2 }}>
        Total: ${calculateTotal().toFixed(2)}
      </Typography>

      <TextField
        fullWidth
        label="Nombre del cliente"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        margin="normal"
      />
      <FormControlLabel
        control={
          <Switch
            checked={takeaway}
            onChange={(e) => setTakeaway(e.target.checked)}
          />
        }
        label="¿Para llevar?"
      />
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmitOrder}
          sx={{ mt: 2, borderRadius: 5 }}
          disabled={lineItems.length === 0 || !customerName}
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : undefined
          }
        >
          Crear orden
        </Button>
      </Box>
    </Card>
  );
}

export default YourShoppingCart;
