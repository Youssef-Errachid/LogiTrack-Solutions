import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { TruckElectric } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authService.js";
import { Link } from "react-router-dom";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegisterSubmit = async () => {
    try {
      setLoading(true);
      const data = await register({ username, email, password, role });
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
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 2 }}>
          Register
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem disabled value="">
                Select Role
              </MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="MANAGER">MANAGER</MenuItem>
              <MenuItem value="AGENT">AGENT</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              disabled={loading}
              onClick={handleRegisterSubmit}
              sx={{
                backgroundColor: "#0226d9",
                width: "80%",
                borderRadius: 5,
                "&:hover": {
                  backgroundColor: "#001fb3",
                },
              }}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </Box>
        </Stack>
        <Typography
          sx={{
            mt: 2,
          }}
        >
          Already have an account? <Link to={"/"}>Go back to Login.</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
