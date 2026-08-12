import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Alert,
  MenuItem,
  TextField,
} from "@mui/material";
import { getClients } from "../../api/clientService";

export default function OrderFormDialog({ open, onClose, onSubmit }) {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      getClients(0, 1000)
        .then((data) => setClients(data.content || []))
        .catch(() => setClients([]));
      setClientId("");
      setError("");
    }
  }, [open]);

  const handleSubmit = async () => {
    setError("");
    if (!clientId) {
      setError("Please select a client");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(clientId);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>New Order</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            select
            label="Client"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            fullWidth
          >
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name} — {client.email}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Create Order"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
