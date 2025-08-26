import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideProps } from "lucide-react";
import React from "react";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { IQuote } from "@/@types/Quote";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type props = {
  data: IQuote["Global Quote"];
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  className?: string;
  iconClassName?: string;
  loading?: boolean;
};

export default function CommoditsCard({
  data,
  className,
  loading,
  ...props
}: props) {
  if (loading) {
    return <Skeleton className="h-[180px] w-full min-w-[300px] rounded-xl" />;
  }

  if (!data["01. symbol"]) return null;

  return (
    <Card className={cn(className, "w-full min-w-[300px] py-8 gap-2")}>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>{data["01. symbol"] || "N/A"}</CardTitle>
        <props.icon className={props.iconClassName} />
      </CardHeader>
      <CardContent className="flex flex-row justify-between">
        <p className="font-bold text-3xl">
          ${data["05. price"] || "N/A"}{" "}
          <span className="text-sm font-semibold">/ETF</span>
        </p>
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        <p className="text-sm font-light">
          {data["07. latest trading day"]
            ? format(parseISO(data["07. latest trading day"]), "dd/MM/yyyy")
            : "N/A"}
        </p>
        <Badge
          variant={
            data["10. change percent"] &&
            (data["10. change percent"].includes("-")
              ? "destructive"
              : "success")
          }
        >
          {data["10. change percent"] || "N/A"}
        </Badge>
      </CardFooter>
    </Card>
  );
}
