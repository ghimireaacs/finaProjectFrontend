import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
    >
      <Typography variant="h1" component="h1">
        404
      </Typography>
      <Typography variant="h5" component="h2" marginBottom={3}>
        Page Not Found
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/"
        style={{ background: "var(--primary)" }}
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
