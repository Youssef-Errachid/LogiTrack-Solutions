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

export default function ProductFormDialog({
  open,
  onClose,
  onSubmit,
  product,
}) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantityInStock: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isEdit = Boolean(product);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        category: product.category || "",
        price: product.price ?? "",
        quantityInStock: product.quantityInStock ?? "",
      });
    } else {
      setForm({ name: "", category: "", price: "", quantityInStock: "" });
    }
    setError("");
  }, [product, open]);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    if (
      !form.name ||
      !form.category ||
      form.price === "" ||
      form.quantityInStock === ""
    ) {
      setError("All fields are required");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        price: Number(form.price),
        quantityInStock: Number(form.quantityInStock),
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Edit Product" : "Add New Product"}</DialogTitle>
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
            label="Category"
            value={form.category}
            onChange={handleChange("category")}
            fullWidth
          />
          <TextField
            label="Price"
            type="number"
            value={form.price}
            onChange={handleChange("price")}
            fullWidth
          />
          <TextField
            label="Quantity In Stock"
            type="number"
            value={form.quantityInStock}
            onChange={handleChange("quantityInStock")}
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
          {submitting ? "Saving..." : isEdit ? "Save Changes" : "Add Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
