import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/product`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};
