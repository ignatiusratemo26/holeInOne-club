import React, { useState, useEffect, useContext } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress, Typography } from "@mui/material";
import { LandPlot } from "lucide-react";
import { fetchSubscriptions } from "../Api";
import { UserContext } from "../UserContext";
import axios from "axios";

const Packages = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mpesaPin, setMpesaPin] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        const data = await fetchSubscriptions();
        setSubscriptions(data);
      } catch (error) {
        console.error("Failed to load subscriptions:", error);
      }
    };

    loadSubscriptions();
  }, []);

  const handleSubscribe = (subscriptionId) => {
    if (!user) {
      alert("Please log in to subscribe.");
      return;
    }
    setSelectedSubscription(subscriptionId);
    setOpenModal(true);
  };

  const handlePurchase = async () => {
    if (!phoneNumber || !mpesaPin) {
      alert("Please fill in all fields.");
      return;
    }
    setLoading(true);

    try {
      // Simulating a purchase delay
      setTimeout(async () => {
        await axios.post('/api/subscriptions/purchase', {
          subscription_id: selectedSubscription,
          phone_number: phoneNumber,
          mpesa_pin: mpesaPin,
        });
        setLoading(false);
        setOpenModal(false);
        alert("Purchase successful!");
      }, 4000);
    } catch (error) {
      console.error("Failed to make a purchase:", error);
      setLoading(false);
      alert("Failed to make a purchase. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setPhoneNumber("");
    setMpesaPin("");
  };

  return (
    <div className="packages-page-container">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Our Subscription Packages
      </Typography>
      <div className="grid md:grid-cols-3 gap-8">
        {subscriptions.map((pkg, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <Typography variant="h6" component="h3" gutterBottom>
              {pkg.name}
            </Typography>
            <ul className="space-y-2 mb-4">
              {pkg.features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-start">
                  <LandPlot className="h-5 w-5 mr-2 text-[#2c3e50] flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              variant="contained"
              onClick={() => handleSubscribe(pkg.id)}
              sx={{
                backgroundColor: '#710193',
                '&:hover': { backgroundColor: '#5c0178' }
              }}
            >
              Subscribe
            </Button>
          </div>
        ))}
      </div>

      {/* Modal for phone number and MPesa PIN */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Enter Payment Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Phone Number"
            type="text"
            fullWidth
            variant="outlined"
            margin="dense"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            label="MPesa PIN"
            type="password"
            fullWidth
            variant="outlined"
            margin="dense"
            value={mpesaPin}
            onChange={(e) => setMpesaPin(e.target.value)}
          />
          {loading && (
            <div className="flex justify-center mt-4">
              <CircularProgress />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handlePurchase}
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: '#710193',
              '&:hover': { backgroundColor: '#5c0178' },
            }}
          >
            Purchase
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Packages;
