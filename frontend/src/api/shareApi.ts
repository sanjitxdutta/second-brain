import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const shareApi = {
    toggleShare: async (token: string, share: boolean) => {
        console.log(API_URL);
        const res = await axios.post(
            `${API_URL}/api/share`,
            { share },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    },

    fetchSharedBrain: async (shareId: string) => {
        const res = await axios.get(`${API_URL}/api/share/${shareId}`);
        return res.data;
    }
};
