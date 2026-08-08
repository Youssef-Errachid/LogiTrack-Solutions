import { Box, Typography } from "@mui/material";

export default function AccessDenied() {
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h1">403</Typography>
      <Typography variant="h6">Access Denied</Typography>
    </Box>
  );
}
