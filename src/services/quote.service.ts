import { IQuote } from "@/@types/Quote";
import api from "@/config/api";

export default class QuoteService {
    static async get(id: string, apiKey?: string): Promise<IQuote> {
        try {
            const response = await api.get("", {
                params: {
                    function: "GLOBAL_QUOTE",
                    symbol: id,
                    apikey: apiKey
                },
            });

            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    }
}