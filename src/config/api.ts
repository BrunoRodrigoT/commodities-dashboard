import { useApiKey } from "@/stores/ApiKeyState";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use(
    (response) => {
        if (response.data?.Information) {
            useApiKey.getState().setLimitExceeded(true);
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
