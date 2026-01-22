import { useQuery } from "@tanstack/react-query"
import { getAllProductsApi, getProductByIdApi } from "./publicapiservice"

export const useGetAllProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: () => getAllProductsApi(),
    })
}

export const useGetProductById = (id: string) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductByIdApi(id),
    })
}