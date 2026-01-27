import { publicApi } from "./publicapi";

export const getAllProductsApi = async () => {
    try {
        const response = await publicApi.get("product/get-all-products");
        return response.data
    } catch (error) {
        console.error("getAllProductsApi Error:", error);
        throw error
    }
}

export const getProductByIdApi = async (id: string) => {
    try {
        const response = await publicApi.get(`product/${id}`);
        return response.data
    } catch (error) {
        console.error("getProductByIdApi Error:", error);
        throw error
    }
}