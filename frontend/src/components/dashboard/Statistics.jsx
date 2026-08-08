import { Grid } from "@mui/material";

import {
  Users,
  Package,
  ShoppingCart,
  Clock3,
  Truck,
  BadgeCheck,
  TriangleAlert,
  Award,
} from "lucide-react";

import StatCard from "./StatCard";

export default function Statistics({ data }) {
  const cards = [
    {
      title: "Clients",
      value: data.clients,
      icon: <Users size={24} />,
      color: "#2563eb",
    },
    {
      title: "Products",
      value: data.products,
      icon: <Package size={24} />,
      color: "#7c3aed",
    },
    {
      title: "Orders",
      value: data.orders,
      icon: <ShoppingCart size={24} />,
      color: "#0891b2",
    },
    {
      title: "Pending",
      value: data.pendingOrders,
      icon: <Clock3 size={24} />,
      color: "#d97706",
    },
    {
      title: "Shipped",
      value: data.shippedOrders,
      icon: <Truck size={24} />,
      color: "#0d9488",
    },
    {
      title: "Delivered",
      value: data.deliveredOrders,
      icon: <BadgeCheck size={24} />,
      color: "#16a34a",
    },
    {
      title: "Low Stock",
      value: data.lowStockProducts.length || 0,
      icon: <TriangleAlert size={24} />,
      color: "#dc2626",
    },
    {
      title: "Top Product",
      value: data.topProduct?.name || "N/A",
      icon: <Award size={24} />,
      color: "#c026d3",
    },
  ];
  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.title}>
          <StatCard {...card} />
        </Grid>
      ))}
    </Grid>
  );
}
