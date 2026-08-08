import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

import { getDashboard } from "../api/dashboardService";

import Statistics from "../components/dashboard/Statistics";
import RecentOrders from "../components/dashboard/RecentOrders";
import LowStockProducts from "../components/dashboard/LowStockProducts";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
        console.log(data);
        setDashboard(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !dashboard) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <Typography color="error">Failed to load dashboard data</Typography>
      </Box>
    );
  }

  return (
    <Box p={{ xs: 2, md: 4 }} sx={{ minHeight: "100vh" }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Dashboard
      </Typography>

      <Statistics data={dashboard} />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          mt: 4,
        }}
      >
        <Box sx={{ flex: 2 }}>
          <RecentOrders orders={dashboard.recentOrders || []} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <LowStockProducts products={dashboard.lowStockProducts || []} />
        </Box>
      </Box>
    </Box>
  );
}
