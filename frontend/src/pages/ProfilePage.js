import React, { useContext, useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import MyPurchases from "./MyPurchases";
import { Box, Button, Typography, Divider, List, ListItem, ListItemText, ListItemIcon, CircularProgress } from "@mui/material";
import { AccountCircle, ShoppingCart, Settings, Logout } from "@mui/icons-material";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    const [subscription, setSubscription] = useState(null);
    const [loadingSubscription, setLoadingSubscription] = useState(true);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = "profile";
    }

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const response = await axios.get("/api/subscriptions/view");
                setSubscription(response.data);
            } catch (error) {
                console.error("Failed to fetch subscription:", error);
                setSubscription(null);
            } finally {
                setLoadingSubscription(false);
            }
        };

        if (subpage === "profile") {
            fetchSubscription();
        }
    }, [subpage]);

    async function logout() {
        await axios.post("/api/logout");
        setRedirect("/");
        setUser(null);
    }

    if (!ready) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                Loading...
            </Box>
        );
    }

    if (ready && !user && !redirect) {
        return <Navigate to={"/login"} />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <Box className="container" sx={{ maxWidth: 1200, mx: "auto", px: 4, py: 8 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Profile
            </Typography>
            <Box display="flex" sx={{ flexDirection: { xs: "column", md: "row" } }}>
                <Box sx={{ width: { xs: "100%", md: "25%" }, mb: { xs: 2, md: 0 }, pr: 2 }}>
                    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                        <ListItem button component={Link} to="/profile" selected={subpage === "profile"}>
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem button component={Link} to="/profile/mypurchases" selected={subpage === "mypurchases"}>
                            <ListItemIcon>
                                <ShoppingCart />
                            </ListItemIcon>
                            <ListItemText primary="My Purchases" />
                        </ListItem>
                        <ListItem button component={Link} to="/profile/settings" selected={subpage === "settings"}>
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItem>
                        <ListItem button onClick={logout}>
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Box>

                <Box sx={{ width: { xs: "100%", md: "75%" }, p: 3, bgcolor: "background.paper", borderRadius: 2, boxShadow: 2 }}>
                    {subpage === "profile" && (
                        <Box>
                            <Typography variant="h5" component="h3" gutterBottom>
                                Hello, {user.name}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Email: {user.email}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" component="h4" gutterBottom>
                                Active Subscription
                            </Typography>
                            {loadingSubscription ? (
                                <CircularProgress />
                            ) : subscription ? (
                                <Box sx={{ p: 2, bgcolor: "purple.50", borderRadius: 2 }}>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Plan Name:</strong> {subscription.subscription.name}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Start Date:</strong> {new Date(subscription.subscription.start_date).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Expiry Date:</strong> {new Date(subscription.subscription.expiry_date).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Days Left:</strong> {subscription.days_left} {subscription.is_expired ? "(Expired)" : ""}
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography variant="body2" color="error">
                                    You have no active subscription.
                                </Typography>
                            )}
                        </Box>
                    )}
                    {subpage === "mypurchases" && <MyPurchases />}
                    {subpage === "settings" && (
                        <Box>
                            <Typography variant="h5" component="h3" gutterBottom>
                                Settings
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Settings content goes here.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
