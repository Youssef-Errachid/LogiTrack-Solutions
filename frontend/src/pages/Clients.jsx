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
} from "@mui/material";
import { Search, Plus, Eye, Pencil, Trash2 } from "lucide-react";

import {
  getClients,
  searchClients,
  createClient,
  updateClient,
  deleteClient,
} from "../api/clientService";
import ClientFormDialog from "../components/clients/ClientFormDialog";
import ClientDetailsDialog from "../components/clients/ClientDetailsDialog";
import DeleteConfirmDialog from "../components/clients/DeleteConfirmDialog";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = search.trim()
        ? await searchClients(search.trim(), page, rowsPerPage)
        : await getClients(page, rowsPerPage);
      setClients(data.content || []);
      setTotalElements(data.totalElements || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchClients();
    }, 400);
    return () => clearTimeout(timeout);
  }, [page, rowsPerPage, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handleAddClick = () => {
    setEditingClient(null);
    setFormOpen(true);
  };

  const handleEditClick = (client) => {
    setEditingClient(client);
    setFormOpen(true);
  };

  const handleViewClick = (client) => {
    setSelectedClient(client);
    setDetailsOpen(true);
  };

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setDeleteOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    if (editingClient) {
      await updateClient(editingClient.id, formData);
    } else {
      await createClient(formData);
    }
    fetchClients();
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteClient(clientToDelete.id);
      setDeleteOpen(false);
      setClientToDelete(null);
      fetchClients();
      toast.success(`${clientToDelete.name} deleted successfully`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        gap={10}
        sx={{ mb: "30px", mt: "30px" }}
      >
        <Typography variant="h5" fontWeight="bold">
          Clients
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "stretch", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            width: { xs: "100%", md: "auto" },
          }}
        >
          <TextField
            placeholder="Search by name"
            value={search}
            onChange={handleSearchChange}
            size="small"
            sx={{
              width: { xs: "100%", sm: 300 },
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} color="#9e9e9e" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            onClick={handleAddClick}
            sx={{
              ml: { xs: 0, sm: "300px" },
              mt: { xs: "16px", sm: 0 },

              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1,
              boxShadow: "none",
              whiteSpace: "nowrap",

              "&:hover": {
                boxShadow: 2,
              },
            }}
          >
            Add Client
          </Button>
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
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clients.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                          <Typography variant="body1" color="text.secondary">
                            No clients found
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
                      clients.map((client) => (
                        <TableRow key={client.id} hover>
                          <TableCell>#{client.id}</TableCell>
                          <TableCell>{client.name}</TableCell>
                          <TableCell>{client.email}</TableCell>
                          <TableCell>{client.phone}</TableCell>
                          <TableCell>{client.city}</TableCell>
                          <TableCell align="right">
                            <Tooltip title="View details">
                              <IconButton
                                size="small"
                                onClick={() => handleViewClick(client)}
                              >
                                <Eye size={18} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={() => handleEditClick(client)}
                              >
                                <Pencil size={18} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteClick(client)}
                              >
                                <Trash2 size={18} />
                              </IconButton>
                            </Tooltip>
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

      <ClientFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        client={editingClient}
      />

      <ClientDetailsDialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        client={selectedClient}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        clientName={clientToDelete?.name}
      />
    </Box>
  );
}
