import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const authApi = {
  signup: async (name: string, email: string, password: string) => {
    const res = await axios.post(`${API_URL}/api/user/signup`, { name, email, password });
    return res.data;
  },
  signin: async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/api/user/signin`, { email, password });
    return res.data;
  },
};
