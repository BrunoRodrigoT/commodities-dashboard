import { IQuote } from "@/@types/Quote";
import api from "@/config/api";

export default class CurrencyExchangeService {
    static async get(from_currency: string, to_currency: string): Promise<IQuote> {
        try {
            const response = await api.get("", {
                params: {
                    function: "CURRENCY_EXCHANGE_RATE",
                    from_currency,
                    to_currency
                },
            });

            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    }
}