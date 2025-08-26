import { ICommodity } from "@/@types/Commodity";
import api from "@/config/api";

export default class CommoditiesService {
    static async get(commodity: string, interval: string, apiKey?: string): Promise<ICommodity> {
        try {
            const response = await api.get("", {
                params: {
                    function: commodity,
                    interval,
                    apikey: apiKey
                },
            });

            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    }
}