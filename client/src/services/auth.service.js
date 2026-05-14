import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/auth`;

// signup
export const signupUser = async (formData) => {
  const response = await axios.post(
    `${API}/signup`,
    formData
  );

  return response.data;
};

// login
export const loginUser = async (formData) => {
  const response = await axios.post(
    `${API}/login`,
    formData
  );

  return response.data;
};