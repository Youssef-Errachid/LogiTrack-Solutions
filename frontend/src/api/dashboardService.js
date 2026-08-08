import api from "./axios";

export const getDashboard = async () => {
  const results = await Promise.allSettled([
    api.get("/api/clients/count"),
    api.get("/api/products/count"),
    api.get("/api/orders/count"),
    api.get("/api/orders/count/pending"),
    api.get("/api/orders/count/shipped"),
    api.get("/api/orders/count/delivered"),
    api.get("/api/products/low-stock"),
    api.get("/api/orders/recent"),
    api.get("/api/products/top"),
  ]);

  const getValue = (result, fallback) =>
    result.status === "fulfilled" ? result.value.data : fallback;

  return {
    clients: getValue(results[0], 0),
    products: getValue(results[1], 0),
    orders: getValue(results[2], 0),
    pendingOrders: getValue(results[3], 0),
    shippedOrders: getValue(results[4], 0),
    deliveredOrders: getValue(results[5], 0),
    lowStockProducts: getValue(results[6], []),
    recentOrders: getValue(results[7], []),
    topProduct: getValue(results[8], null),
  };
};
