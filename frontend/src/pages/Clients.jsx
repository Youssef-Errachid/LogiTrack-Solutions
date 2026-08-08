import { useEffect, useState } from "react";
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
} from "@mui/material";
import { Search, Plus } from "lucide-react";

import { getClients, searchClients, createClient } from "../api/clientService";
import AddClientDialog from "../components/clients/AddClientDialog";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleClientAdded = async (formData) => {
    await createClient(formData);
    fetchClients();
  };

  return (
    <Box>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        gap={2}
        sx={{ mb: "80px" }}
      >
        <Typography variant="h5" fontWeight="bold">
          Clients
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
            onClick={() => setDialogOpen(true)}
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clients.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
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

      <AddClientDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onClientAdded={handleClientAdded}
      />
    </Box>
  );
}
