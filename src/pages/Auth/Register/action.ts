import { ENDPOINTS } from "../../../types";
import { API } from "../../../utils/axiosInstance";

// Define the request body interface
interface RegisterPayload {
  user_name: string;
  role: string;
  username: string;
  password: string;
}

// Registration API call function
export const registerUser = async (data: RegisterPayload) => {
  try {
    const response = await API.post(ENDPOINTS.Register, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
