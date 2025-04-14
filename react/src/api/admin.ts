import axios from "utils/axios";

export const login = async (userId: string) => {
  try {
    const response = await axios.post("/admin/token", {
      userId,
    });
    return response.data.token;
  } catch (error) {
    console.error("Error during login: ", error);
    throw error;
  }
};
