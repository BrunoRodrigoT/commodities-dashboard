import isClientSide from "@/utils/isClientSide";
import { getSession, signOut } from 'next-auth/react';
import axios, { AxiosError } from "axios"

const getApiUrl = () => {
    if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
        return 'http://todo_api:3333';
    }
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';
};

const api = axios.create();

api.interceptors.request.use(
    async (config) => {
        config.baseURL = getApiUrl();
        return config;
    },
    (err) => Promise.reject(err),
);

api.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        config.headers.platform = 'web';

        if (isClientSide() && session?.token) {
            if (!config.headers.authorization) {
                config.headers.authorization = `bearer ${session?.token}`;
                return config;
            }

            delete config.headers.Authorization;
        }
        return config;
    },
    (err) => Promise.reject(err),
);

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const session = await getSession();
        if (error.response) {
            const { status } = error.response;
            Promise.reject(error.response.data);
            if (status === 401 && session?.token) {
                signOut().then(() => {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('filters', JSON.stringify({}));
                    }
                });
            }
            if (status === 403 || status === 500) {
                return Promise.reject(new Error(`Ocorreu um erro inesperado: ${status}`));
            }
        }

        let errorMessage = 'Ocorreu um erro inesperado';
        try {
            if (error.response?.data && typeof error.response.data === 'object') {
                const responseData = error.response.data as { message?: string };
                if (responseData.message && typeof responseData.message === 'string') {
                    errorMessage = responseData.message;
                }
            } else if (error.message) {
                errorMessage = error.message;
            }
        } catch (e) {
            console.error('Error while processing error message:', e);
        }

        return Promise.reject(new Error(errorMessage));
    },
);

export default api;