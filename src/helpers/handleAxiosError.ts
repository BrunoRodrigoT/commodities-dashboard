import IAPIErrorResponse from "@/@types/Error";
import { AxiosError } from "axios";

export default function handleAxiosError(error: unknown): never {
    const axiosError = error as AxiosError<IAPIErrorResponse>;

    if (axiosError.response && axiosError.response.data?.message) {
        throw new Error(axiosError.response.data.message);
    }

    throw new Error("Erro desconhecido.");
}