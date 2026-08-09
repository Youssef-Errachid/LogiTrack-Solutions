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
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../api/authService.js";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 chars"),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const data = await login(formData);
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

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
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
        </Box>
      </Paper>
    </Container>
  );
}
