/* eslint-disable @typescript-eslint/no-explicit-any */
export type Series = {
    date: string;
    [key: string]: number | string | null;
};

type InputSeries = {
    name: string;
    data: { date: string; value: string | number }[];
};

export default function mergeSeries(seriesList: InputSeries[]): Series[] {
    const merged: Record<string, any> = {};

    seriesList.forEach((series) => {
        series.data.forEach(({ date, value }) => {
            const numericValue = Number(value);

            if (value === "." || isNaN(numericValue)) {
                return;
            }

            if (!merged[date]) merged[date] = { date };

            merged[date][series.name] = numericValue;
        });
    });

    // retorna ordenado por data
    return Object.values(merged).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
}
