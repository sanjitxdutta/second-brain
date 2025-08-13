import axios from "axios";

export const shareApi = {
  toggleShare: async (token: string, share: boolean) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/share`,
      { share },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data; 
  }
};
