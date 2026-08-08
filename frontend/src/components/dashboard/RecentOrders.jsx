import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

const statusColors = {
  PENDING: "warning",
  SHIPPED: "info",
  DELIVERED: "success",
  CANCELLED: "error",
};

export default function RecentOrders({ orders }) {
  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Recent Orders
        </Typography>

        <TableContainer>
          <Table size="small" sx={{ width: "100%" }}>
            <TableHead>
              <TableRow
                sx={{ "& th": { fontWeight: 600, backgroundColor: "#f8f9fa" } }}
              >
                <TableCell>ID</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No recent orders
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>{order.clientName}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        size="small"
                        color={statusColors[order.status] || "default"}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
