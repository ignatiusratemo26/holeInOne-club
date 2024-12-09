import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Link as MuiLink,
} from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      setUser(response.data);
      setRedirect(true);
      navigate('/');
    } catch (e) {
      if (e.response && e.response.status === 401) {
        console.error('Unauthorized: Incorrect email or password');
      } else {
        console.error('Login failed', e);
      }
      alert('Login failed');
    }

    if (redirect) {
      return <Navigate to="/" />;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ff7eb3, #845ec2)',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Login
        </Typography>
        <Typography align="center" sx={{ mb: 2 }}>
          Don't have an account yet?{' '}
          <MuiLink component={Link} to="/register" underline="hover" color="primary">
            Register now
          </MuiLink>
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#845ec2',
              '&:hover': { backgroundColor: '#6d48a8' },
              py: 1.5,
              mt: 2,
            }}
          >
            Login
          </Button>
        </form>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: 'text.secondary' }}
        >
          By logging in, you agree to our{' '}
          <MuiLink href="#" underline="hover">
            terms of service
          </MuiLink>{' '}
          and{' '}
          <MuiLink href="#" underline="hover">
            privacy policy
          </MuiLink>.
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
