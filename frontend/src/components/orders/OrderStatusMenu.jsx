import { useState } from "react";
import { Chip, Menu, MenuItem } from "@mui/material";

const statusColors = {
  PENDING: "warning",
  SHIPPED: "info",
  DELIVERED: "success",
  CANCELLED: "error",
};

const statuses = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function OrderStatusMenu({ order, onStatusChange, disabled }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => {
    if (disabled) return;
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelect = async (status) => {
    handleClose();
    if (status !== order.status) {
      await onStatusChange(order.id, status);
    }
  };

  return (
    <>
      <Chip
        label={order.status}
        size="small"
        color={statusColors[order.status] || "default"}
        variant="outlined"
        onClick={handleOpen}
        sx={{ cursor: disabled ? "default" : "pointer" }}
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {statuses.map((status) => (
          <MenuItem key={status} onClick={() => handleSelect(status)}>
            {status}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
