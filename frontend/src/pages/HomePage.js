import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LandPlot } from "lucide-react";
import { Button } from "@mui/material";
import { fetchSubscriptions } from "../Api"; // Import the fetchSubscriptions function

const HomePage = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        // Fetch subscription data
        const data = await fetchSubscriptions();
        setSubscriptions(data); // Update state with fetched data
      } catch (error) {
        console.error("Failed to load subscriptions:", error);
      }
    };

    loadSubscriptions();
  }, []);

  const handleExploreClubClick = () => {
    navigate("/shop");
  };

  return (
    <div className="container mx-auto px-4 py-8 relative overflow-hidden">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to HoleInOne Club</h1>
        <p className="text-xl mb-8">
          Discover the ultimate golf experience with exclusive memberships,
          world-class courses, and unparalleled community.
        </p>
        <Button
          onClick={handleExploreClubClick}
          variant="contained"
          style={{ backgroundColor: "#710193" }}
          size="large"
        >
          Explore Our Club
        </Button>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white rounded-lg shadow-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">About HoleInOne Club</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">
            HoleInOne Club is an exclusive golf community offering premium
            memberships, access to world-class golf courses, personalized
            coaching, and a vibrant social environment for golf enthusiasts.
            Whether you're a beginner or a seasoned golfer, our club provides
            the perfect space to elevate your game and connect with like-minded
            individuals.
          </p>
        </div>
      </section>

      {/* Membership Packages Section */}
      <section id="packages" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Membership Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {subscriptions.map((pkg, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                <p className="text-xl font-semibold mb-4 text-[#2c3e50]">
                  Ksh {pkg.price}/month
                </p>
                <ul className="space-y-2">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <LandPlot className="h-5 w-5 mr-2 text-[#2c3e50] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
