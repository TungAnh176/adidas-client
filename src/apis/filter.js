import { makeRequest } from "../axios";

const filterAPI = {
    getAllProducts: async ({ name, latest, mostSold, lowestPrice, highestPrice, priceRange, color, size }) => {
        try {
            const queryParams = new URLSearchParams({
                name: name || "",
                latest: latest || "",
                mostSold: mostSold || "",
                lowestPrice: lowestPrice || "",
                highestPrice: highestPrice || "",
                priceRange: priceRange || "",
                color: color || "",
                size: size || ""
            });
            const response = await makeRequest.get(`/api/v1/products/filter?${queryParams}`);
            return response.data;
        } catch (error) {
            return error?.response?.data;
        }
    }
};

export default filterAPI;
