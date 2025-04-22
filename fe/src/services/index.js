import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get("/api/products");
    return response.data;
  } catch (err) {
    return err;
  }
};
