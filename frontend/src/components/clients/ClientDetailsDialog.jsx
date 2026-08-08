import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  Box,
} from "@mui/material";

export default function ClientDetailsDialog({ open, onClose, client }) {
  if (!client) return null;

  const fields = [
    { label: "ID", value: `#${client.id}` },
    { label: "Name", value: client.name },
    { label: "Email", value: client.email },
    { label: "Phone", value: client.phone },
    { label: "City", value: client.city || "—" },
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Client Details</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          {fields.map((field) => (
            <Box key={field.label}>
              <Typography variant="body2" color="text.secondary">
                {field.label}
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {field.value}
              </Typography>
            </Box>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
