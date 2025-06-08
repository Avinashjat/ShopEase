import axios from "axios";

const BASE_URL = "http://localhost:5000/api/products";

const fetchProductsAPI = async () => {
  return axios.get(BASE_URL);
};

export { fetchProductsAPI };
