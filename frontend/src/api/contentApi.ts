import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const contentApi = {
  getNotes: async (token: string) => {
    const res = await axios.get(`${API_URL}/api/content/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  addNote: async (noteData: any, token: string) => {
    const res = await axios.post(`${API_URL}/api/content/add`, noteData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  deleteNote: async (token: string, id: string) => {
    const res = await axios.post(
      `${API_URL}/api/content/delete`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    return res.data;
  }


};
