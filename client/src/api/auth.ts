import axios from "axios";

export const loginApi = async (email: string, password: string) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/login`,
    { email, password },
    {
      withCredentials: true,
    }
  );
  return res;
};

export const logoutApi = async () => {
  await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, null, {
    withCredentials: true,
  });
};
