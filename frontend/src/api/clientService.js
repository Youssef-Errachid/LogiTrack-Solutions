import api from "./axios";

export const getClients = async (
  page = 0,
  size = 10,
  sortby = "name",
  direction = "asc",
) => {
  const response = await api.get("/api/clients", {
    params: { page, size, sortby, direction },
  });
  return response.data;
};

export const searchClients = async (keyword, page = 0, size = 10) => {
  const response = await api.get("/api/clients/search", {
    params: { keyword, page, size },
  });
  return response.data;
};

export const createClient = async (clientData) => {
  const response = await api.post("/api/clients", clientData);
  return response.data;
};

export const updateClient = async (id, clientData) => {
  const response = await api.put(`/api/clients/${id}`, clientData);
  return response.data;
};

export const deleteClient = async (id) => {
  await api.delete(`/api/clients/${id}`);
};
