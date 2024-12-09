import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid2,
  Grid,
} from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import axios from 'axios';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulating an API call with axios
      await axios.post('/api/contact', formData);

      // Clear fields and show dialog
      setFormData({ name: '', email: '', message: '' });
      setDialogOpen(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5, marginBottom: 5 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
          <ContactMailIcon sx={{ fontSize: 50, color: '#1976d2' }} />
        </Box>
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" mb={3}>
          We'd love to hear from you! Fill out the form below to get in touch.
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" mt={3}>
            <Button variant="contained" color="primary" type="submit">
              Send Message
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Dialog for successful submission */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Submission Successful</DialogTitle>
        <DialogContent>
          <Typography>Your message has been sent successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ContactPage;
