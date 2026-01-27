import { useQuery } from "@tanstack/react-query"
import {
    getAllProductsApi,
    getCatalogsApi,
    getCollectionsApi,
    getProductByIdApi
} from "./publicapiservice"

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

export const useGetCollections = () => {
    return useQuery({
        queryKey: ["collections"],
        queryFn: () => getCollectionsApi(),
    })
}

export const useGetCatalogs = () => {
    return useQuery({
        queryKey: ["catalogs"],
        queryFn: () => getCatalogsApi(),
    })
}