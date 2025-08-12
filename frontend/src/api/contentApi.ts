// src/api/contentApi.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const contentApi = {
  getNotes: async (token: string) => {
    const res = await axios.get(`${API_URL}/content/notes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  addNote: async (noteData: any, token: string) => {
    const res = await axios.post(`${API_URL}/content/notes`, noteData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  deleteNote: async (id: string, token: string) => {
    const res = await axios.delete(`${API_URL}/content/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
};
