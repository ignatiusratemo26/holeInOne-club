import React, { useState, useContext } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  styled,
} from '@mui/material';
import { UserContext } from "../UserContext";
import { CartContext } from "./CartContext";

// Styled button with animation
const AnimatedButton = styled(Button)({
  backgroundColor: '#710193',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1rem',
  padding: '10px 20px',
  borderRadius: '50px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#5c0178',
    transform: 'scale(1.1)',
    boxShadow: '0 4px 15px rgba(113, 1, 147, 0.4)',
  },
});

const ProductCard = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const handleAddToCart = () => {
    if (user) {
      addToCart(product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1000);
    } else {
      alert("Please log in to add items to the cart.");
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Full container width
        margin: '20px 0',
      }}
    >
      <Card
        sx={{
          width: '100%', // 80% of the screen width
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          overflow: 'hidden',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            position: 'relative',
            height: 300,
            backgroundImage: `url(${product.photo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderBottom: '1px solid #f0f0f0',
          }}
        />

        {/* Content Section */}
        <CardContent sx={{ padding: 3 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{
              color: '#2c3e50',
              textAlign: 'center',
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: 'justify',
              marginBottom: 2,
            }}
          >
            {product.description}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 1,
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight="500"
              sx={{
                backgroundColor: '#f5f5f5',
                padding: '5px 10px',
                borderRadius: '5px',
                color: '#555',
              }}
            >
              Category: {product.category}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: '#710193' }}
            >
              Ksh {product.price.toFixed(2)} / day
            </Typography>
          </Box>
        </CardContent>

        {/* Actions Section */}
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: 2,
          }}
        >
          <AnimatedButton onClick={handleAddToCart}>
            {isAdded ? 'Added to Cart!' : 'Add to Cart'}
          </AnimatedButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductCard;
