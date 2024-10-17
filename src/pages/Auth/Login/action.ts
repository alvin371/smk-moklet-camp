import { ENDPOINTS } from "../../../types";
import { API } from "../../../utils/axiosInstance";

// Define the request body interface
interface LoginPayload {
  username: string;
  password: string;
}

// Registration API call function
export const handleLogin = async (data: LoginPayload) => {
  try {
    const response = await API.post(ENDPOINTS.Login, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
