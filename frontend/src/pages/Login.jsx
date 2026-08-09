import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { TruckElectric } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authService.js";
import { Link } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    try {
      setLoading(true);
      const data = await login({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 6,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "420px",
          p: 3,
          borderRadius: 3,
          boxShadow: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <TruckElectric size={65} color="#0226d9" />
        </Box>
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 3 }}>
          Login
        </Typography>
        <Stack spacing={3}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleLoginSubmit}
              sx={{
                backgroundColor: "#0226d9",
                width: "80%",
                borderRadius: 5,
                "&:hover": {
                  backgroundColor: "#001fb3",
                },
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Box>

          <Typography>
            <Link to={"/"}>Forgot Password?</Link>
          </Typography>
          <Typography>
            Don't have an account? <Link to={"/register"}>Sign Up Here.</Link>
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
