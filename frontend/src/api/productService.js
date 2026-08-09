import api from "./axios";

export const getProducts = async (
  page = 0,
  size = 10,
  sortby = "name",
  direction = "asc",
) => {
  const response = await api.get("/api/products", {
    params: { page, size, sortby, direction },
  });
  return response.data;
};

export const searchProducts = async (keyword, page = 0, size = 10) => {
  const response = await api.get("/api/products/search", {
    params: { keyword, page, size },
  });
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post("/api/products", productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/api/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  await api.delete(`/api/products/${id}`);
};
