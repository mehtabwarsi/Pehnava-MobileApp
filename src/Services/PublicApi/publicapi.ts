import axios from "axios";
import Config from "react-native-config";

export const publicApi = axios.create({
    baseURL: Config.API_URL,
    withCredentials: true,
});
