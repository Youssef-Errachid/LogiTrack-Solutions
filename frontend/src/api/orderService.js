import api from "./axios";

export const getOrders = async (
  page = 0,
  size = 10,
  sortby = "orderDate",
  direction = "desc",
) => {
  const response = await api.get("/api/orders", {
    params: { page, size, sortby, direction },
  });
  return response.data;
};

export const createOrder = async (clientId) => {
  const response = await api.post("/api/orders", { clientId });
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/api/orders/${id}/status`, null, {
    params: { status },
  });
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/api/orders/${id}`);
  return response.data;
};
