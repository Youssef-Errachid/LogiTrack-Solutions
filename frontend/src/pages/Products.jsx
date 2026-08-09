import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  CircularProgress,
  TablePagination,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

import {
  getProducts,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productService";
import { hasRole } from "../api/authService";
import ProductFormDialog from "../components/products/ProductFormDialog";
import DeleteConfirmDialog from "../components/clients/DeleteConfirmDialog";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const canAdd = hasRole("ADMIN", "MANAGER");
  const canEdit = hasRole("ADMIN", "MANAGER");
  const canDelete = hasRole("ADMIN");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = search.trim()
        ? await searchProducts(search.trim(), page, rowsPerPage)
        : await getProducts(page, rowsPerPage);
      setProducts(data.content || []);
      setTotalElements(data.totalElements || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts();
    }, 400);
    return () => clearTimeout(timeout);
  }, [page, rowsPerPage, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        toast.success("Product updated successfully");
      } else {
        await createProduct(formData);
        toast.success("Product added successfully");
      }
      fetchProducts();
    } catch (err) {
      toast.error("Failed to save product");
      throw err;
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(productToDelete.id);
      setDeleteOpen(false);
      setProductToDelete(null);
      fetchProducts();
      toast.success(`${productToDelete.name} deleted successfully`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        gap={2}
        sx={{ mb: "30px", mt: "30px" }}
      >
        <Typography variant="h5" fontWeight="bold">
          Products
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={4}
          alignItems="center"
        >
          <TextField
            placeholder="Search by name"
            value={search}
            onChange={handleSearchChange}
            size="small"
            sx={{
              width: { xs: "100%", sm: 300 },
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": { borderRadius: 2 },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} color="#9e9e9e" />
                </InputAdornment>
              ),
            }}
          />

          {canAdd && (
            <Button
              variant="contained"
              startIcon={<Plus size={18} />}
              onClick={handleAddClick}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                py: 1,
                boxShadow: "none",
                whiteSpace: "nowrap",
                "&:hover": { boxShadow: 2 },
              }}
            >
              Add Product
            </Button>
          )}
        </Box>
      </Box>

      <Card
        elevation={0}
        sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}
      >
        <CardContent>
          {loading ? (
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table sx={{ width: "100%" }}>
                  <TableHead>
                    <TableRow
                      sx={{
                        "& th": { fontWeight: 600, backgroundColor: "#f8f9fa" },
                      }}
                    >
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Stock</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                          <Typography variant="body1" color="text.secondary">
                            No products found
                          </Typography>
                          {search && (
                            <Typography
                              variant="body2"
                              color="text.disabled"
                              mt={0.5}
                            >
                              Try adjusting your search
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ) : (
                      products.map((product) => (
                        <TableRow key={product.id} hover>
                          <TableCell>#{product.id}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>
                            <Chip
                              label={product.quantityInStock}
                              size="small"
                              color={
                                product.quantityInStock === 0
                                  ? "error"
                                  : "default"
                              }
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">
                            {canEdit && (
                              <Tooltip title="Edit">
                                <IconButton
                                  size="small"
                                  onClick={() => handleEditClick(product)}
                                >
                                  <Pencil size={18} />
                                </IconButton>
                              </Tooltip>
                            )}
                            {canDelete && (
                              <Tooltip title="Delete">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleDeleteClick(product)}
                                >
                                  <Trash2 size={18} />
                                </IconButton>
                              </Tooltip>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                component="div"
                count={totalElements}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </>
          )}
        </CardContent>
      </Card>

      <ProductFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        product={editingProduct}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        clientName={productToDelete?.name}
      />
    </Box>
  );
}
