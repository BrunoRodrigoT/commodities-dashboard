"use client";

import { CommoditsCard } from "@/components/Cards";
import React, { useEffect } from "react";
import QuoteService from "@/services/quote.service";
import { useQueries } from "@tanstack/react-query";
import { DollarSign, TrendingUp, Wheat } from "lucide-react";
import { useApiKey } from "@/contexts/ApiKeyContext";
import toast from "@/utils/toast";

export default function Quotes() {
  const { apiKey } = useApiKey();

  const [wheatQuote, cornQuote, dollarQuote] = useQueries({
    queries: [
      {
        queryKey: ["wheatQuote", apiKey],
        queryFn: () => QuoteService.get("Wheat", apiKey),
        retry: false,
        enabled: apiKey !== "",
      },
      {
        queryKey: ["cornQuote", apiKey],
        queryFn: () => QuoteService.get("Corn", apiKey),
        retry: false,
        enabled: apiKey !== "",
      },
      {
        queryKey: ["dollarQuote", apiKey],
        queryFn: () => QuoteService.get("DOL", apiKey),
        retry: false,
        enabled: apiKey !== "",
      },
    ],
  });

  useEffect(() => {
    const quotes = [
      { name: "Wheat", data: wheatQuote.data },
      { name: "Corn", data: cornQuote.data },
      { name: "Dollar", data: dollarQuote.data },
    ];

    quotes.forEach(({ name, data }) => {
      if (!data) return;

      if ((data as never)["Error Message"]) {
        toast({
          type: "error",
          message: `${name}: ${(data as never)["Error Message"]}`,
        });
      }

      if ((data as never)["Information"]) {
        toast({
          type: "info",
          message: `${name}: ${(data as never)["Information"]}`,
        });
      }
    });
  }, [wheatQuote.data, cornQuote.data, dollarQuote.data]);

  return (
    <section className="flex flex-row gap-4 w-full items-center justify-center max-lg:flex-col ">
      <CommoditsCard
        data={wheatQuote.data?.["Global Quote"] || {}}
        loading={wheatQuote.isLoading}
        icon={Wheat}
        className="border-2 border-success-200 bg-success-100 dark:bg-success-900 dark:border-success-800 "
        iconClassName="text-success-600 dark:text-success-200 size-8"
      />
      <CommoditsCard
        data={cornQuote.data?.["Global Quote"] || {}}
        loading={cornQuote.isLoading}
        icon={TrendingUp}
        className="border-2 border-warning-200 bg-warning-50 dark:bg-warning-900 dark:border-warning-800 "
        iconClassName="text-warning-600 dark:text-warning-200 size-8"
      />
      <CommoditsCard
        data={dollarQuote.data?.["Global Quote"] || {}}
        loading={dollarQuote.isLoading}
        icon={DollarSign}
        className="border-2 border-info-200 bg-info-100 dark:bg-info-900 dark:border-info-800 "
        iconClassName="text-info-600 dark:text-info-200 size-8"
      />
    </section>
  );
}
