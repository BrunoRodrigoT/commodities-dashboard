import { LineChart } from "@/components/Charts";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";
import React from "react";

type Props = {
  isLoading: boolean;
  data: Series[];
};

export default function LineDashboard({ isLoading, data }: Props) {
  if (isLoading) {
    return <Skeleton className="h-[400px] w-full rounded-md" />;
  }

  return (
    <section className="w-full">
      <Card className="w-full h-[400px] p-4 rounded-md shadow-md">
        <CardHeader>
          <h2 className="flex flex-row items-center gap-2 text-lg font-semibold mb-4">
            <TrendingUp className="text-success-500 dark:text-success-200" />{" "}
            Evolução dos Preços
          </h2>
        </CardHeader>
        <LineChart
          data={data}
          layout="horizontal"
          x={{ dataKey: "date" }}
          y={{}}
          lines={[
            { key: "Global Price of Wheat", color: "#4ade80" },
            { key: "Global Price of Corn", color: "#facc15" },
          ]}
          legend={{
            payload: [
              { value: "Wheat", color: "#4ade80" },
              { value: "Corn", color: "#facc15" },
            ],
          }}
          tooltip={{ cursor: false }}
          className="w-full h-full"
        />
      </Card>
    </section>
  );
}
