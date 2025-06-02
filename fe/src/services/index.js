import axios from "axios";

export const fetchProducts = async (page, limit, searchQuery) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/product?page=${page}&limit=${limit}&${searchQuery}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};
