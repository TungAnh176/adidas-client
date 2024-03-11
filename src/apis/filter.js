import { makeRequest } from "../axios";

const filterAPI = {
  getAllProducts: async ({
    name,
    latest,
    mostSold,
    lowestPrice,
    highestPrice,
    priceRange,
    color,
    size,
  }) => {
    try {
      const response = await makeRequest.get(
        `/api/v1/products/filter?name=${queryParams.get(
          "name"
        )}&latest=${queryParams.get("latest")}&mostSold=${queryParams.get(
          "mostSold"
        )}&lowestPrice=${queryParams.get(
          "lowestPrice"
        )}&highestPrice=${queryParams.get(
          "highestPrice"
        )}&priceRange=${queryParams.get("priceRange")}&color=${queryParams.get(
          "color"
        )}&size=${queryParams.get("size")}`
      );
      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
};

export default filterAPI;
