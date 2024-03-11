import { makeRequest } from "../axios";



const productsAPI = {
    getAllProducts: async () => {
        try{
            const response = await makeRequest.get("/api/v1/products");
            return response.data;
        }catch(error){
            return error?.response?.data;
        }
    }

};

export default productsAPI;
