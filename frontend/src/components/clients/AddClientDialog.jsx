import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";

export default function AddClientDialog({ open, onClose, onClientAdded }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.name || !form.email || !form.phone || !form.city) {
      setError("All fields are required");
      return;
    }

    setSubmitting(true);
    try {
      await onClientAdded(form);
      setForm({ name: "", email: "", phone: "", city: "" });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add client");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Client</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Name"
            value={form.name}
            onChange={handleChange("name")}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            fullWidth
          />
          <TextField
            label="Phone"
            value={form.phone}
            onChange={handleChange("phone")}
            fullWidth
          />
          <TextField
            label="City"
            value={form.city}
            onChange={handleChange("city")}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Client"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
