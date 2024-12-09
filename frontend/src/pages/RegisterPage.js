import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Link,
} from '@mui/material';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [marketingOptOut, setMarketingOptOut] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('/api/register', {
        name,
        email,
        password,
      });
      console.log('Registration successful:', response);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
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
          Sign up
        </Typography>
        <Typography align="center" sx={{ mb: 2 }}>
          Create an account or{' '}
          <Link href="/login" underline="hover" color="primary">
            Sign in
          </Link>
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={marketingOptOut}
                onChange={(e) => setMarketingOptOut(e.target.checked)}
                color="primary"
              />
            }
            label="I do not want to receive emails with advertising, news, suggestions, or marketing promotions"
            sx={{ mt: 1, mb: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#845ec2',
              '&:hover': { backgroundColor: '#6d48a8' },
              py: 1.5,
            }}
          >
            Sign up
          </Button>
        </form>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: 'text.secondary' }}
        >
          By signing up to create an account, you are accepting our{' '}
          <Link href="#" underline="hover">
            terms of service
          </Link>{' '}
          and{' '}
          <Link href="#" underline="hover">
            privacy policy
          </Link>.
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
