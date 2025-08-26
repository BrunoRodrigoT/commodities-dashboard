export interface ICommodity {
    name: string;
    interval: string;
    unit: string;
    data: {
        date: string;
        value: string;
    }[];
}