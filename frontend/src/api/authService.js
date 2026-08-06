import api from "./axios";

export const login = async (data) => {
    const response = await api.post("/api/auth/login", data);
    return response.data;
}

export const register = async (data) => {
    const response = await api.post("/api/auth/register", data);
    return response.data;
}
