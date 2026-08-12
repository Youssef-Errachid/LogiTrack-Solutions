import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Button,
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
import { Plus } from "lucide-react";

import { getOrders, createOrder, updateOrderStatus } from "../api/orderService";
import { hasRole } from "../api/authService";
import OrderFormDialog from "../components/orders/OrderFormDialog";
import OrderStatusMenu from "../components/orders/OrderStatusMenu";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  const canAdd = hasRole("ADMIN", "MANAGER");
  const canUpdateStatus = hasRole("ADMIN", "MANAGER", "AGENT");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders(page, rowsPerPage);
      setOrders(data.content || []);
      setTotalElements(data.totalElements || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, rowsPerPage]);

  const handleAddClick = () => setFormOpen(true);

  const handleCreateOrder = async (clientId) => {
    try {
      await createOrder(clientId);
      toast.success("Order created successfully");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to create order");
      throw err;
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      toast.success("Order status updated");
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order status");
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
          Orders
        </Typography>

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
            Add Order
          </Button>
        )}
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
                      <TableCell>Client</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                          <Typography variant="body1" color="text.secondary">
                            No orders found
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      orders.map((order) => (
                        <TableRow key={order.id} hover>
                          <TableCell>#{order.id}</TableCell>
                          <TableCell>{order.clientName}</TableCell>
                          <TableCell>{order.orderDate}</TableCell>
                          <TableCell>
                            <OrderStatusMenu
                              order={order}
                              onStatusChange={handleStatusChange}
                              disabled={!canUpdateStatus}
                            />
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

      <OrderFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreateOrder}
      />
    </Box>
  );
}
