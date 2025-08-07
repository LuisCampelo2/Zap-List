import axios from "axios";

export const logoutApi = async () => {
  await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, null, {
    withCredentials: true,
  });
};