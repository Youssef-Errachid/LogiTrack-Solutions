import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h1" fontWeight="bold" color="primary">
        404
      </Typography>

      <Typography variant="h6" mb={3}>
        Page Not Found
      </Typography>

      <Button variant="contained" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </Button>
    </Box>
  );
}
