import React, { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

const Cart = () => {
  const { cartItems, fetchCart, addToCart, removeFromCart, purchaseCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchCart();
  }, []);

  const handleAddToCart = (product) => {
    if (user) {
      addToCart(product);
    } else {
      alert("Please log in to add items to the cart.");
    }
  };

  const handleRemoveFromCart = (productId) => {
    if (user) {
      removeFromCart(productId);
    } else {
      alert("Please log in to remove items from the cart.");
    }
  };

  const handlePurchaseCart = () => {
    if (user) {
      purchaseCart();
      alert("Purchase successful!");
    } else {
      alert("Please log in to purchase items.");
    }
  };

  return (
    <Box className="container mx-auto px-4 py-8">
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <Box>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ mb: 2, display: "flex", padding: 2, boxShadow: 3 }}>
              <Grid container spacing={2} alignItems="center">
                {/* Product Image */}
                <Grid item xs={3}>
                  <CardMedia
                    component="img"
                    image={item.product.photo}
                    alt={item.product.name}
                    sx={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 1,
                      boxShadow: 1,
                    }}
                  />
                </Grid>

                {/* Product Details */}
                <Grid item xs={6}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>{item.product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Ksh {item.product.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Quantity: {item.quantity}
                  </Typography>
                </Grid>

                {/* Remove Button */}
                <Grid item xs={3}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveFromCart(item.id)}
                    fullWidth
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </Card>
          ))}

          {/* Total and Purchase Section */}
          <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
            Total: Ksh {cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}
          </Typography>
          <Box sx={{ mt: 2 }}>
            {user ? (
              <Button
                variant="contained"
                onClick={handlePurchaseCart}
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#710193",
                  "&:hover": { backgroundColor: "#5c0178" },
                }}
              >
                Purchase
              </Button>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Log in to Checkout
                </Button>
              </Link>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
