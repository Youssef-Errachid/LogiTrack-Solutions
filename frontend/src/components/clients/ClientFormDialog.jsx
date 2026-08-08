import { useState, useEffect } from "react";
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

export default function ClientFormDialog({ open, onClose, onSubmit, client }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isEdit = Boolean(client);

  useEffect(() => {
    if (client) {
      setForm({
        name: client.name || "",
        email: client.email || "",
        phone: client.phone || "",
        city: client.city || "",
      });
    } else {
      setForm({ name: "", email: "", phone: "", city: "" });
    }
    setError("");
  }, [client, open]);

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
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save client");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Edit Client" : "Add New Client"}</DialogTitle>
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
          {submitting ? "Saving..." : isEdit ? "Save Changes" : "Add Client"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
