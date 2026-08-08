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

export default function LowStockProducts({ products }) {
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
          Low Stock Products
        </Typography>

        <TableContainer>
          <Table size="small" sx={{ width: "100%" }}>
            <TableHead>
              <TableRow
                sx={{ "& th": { fontWeight: 600, backgroundColor: "#f8f9fa" } }}
              >
                <TableCell>Product</TableCell>
                <TableCell align="right">Stock</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No low stock products
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>{product.name}</TableCell>
                    <TableCell align="right">
                      <Chip
                        label={product.quantityInStock}
                        size="small"
                        color={
                          product.quantityInStock === 0 ? "error" : "warning"
                        }
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
