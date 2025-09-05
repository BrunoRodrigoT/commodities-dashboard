/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect } from "react";
import LineDashboard from "../LineDashboard";
import TableData from "../TableData";
import mergeSeries, { Series } from "@/utils/mergeDataSeries";
import { useQueries } from "@tanstack/react-query";
import CommoditiesService from "@/services/commodities.service";
import { useForm } from "react-hook-form";
import { SelectField } from "@/components/SelectField";
import { useApiKey } from "@/stores/ApiKeyState";
import toast from "@/utils/toast";

export default function DataListProvider() {
  const { apiKey } = useApiKey();
  const [mergedState, setMergedState] = React.useState<Series[]>([]);

  const { control, watch } = useForm({
    defaultValues: {
      interval: "annual",
    },
  });

  const [wheat, corn] = useQueries({
    queries: [
      {
        queryKey: ["wheat", watch("interval"), apiKey],
        queryFn: () =>
          CommoditiesService.get("WHEAT", watch("interval"), apiKey),
        retry: false,
        enabled: apiKey !== "",
      },
      {
        queryKey: ["corn", watch("interval"), apiKey],
        queryFn: () =>
          CommoditiesService.get("CORN", watch("interval"), apiKey),
        retry: false,
        enabled: apiKey !== "",
      },
    ],
  });

  const mergedData = useCallback((wheat: Series, corn: Series) => {
    return mergeSeries([wheat as never, corn as never]);
  }, []);

  useEffect(() => {
    if (wheat.data && corn.data && wheat.data.data && corn.data.data) {
      const merged = mergedData(wheat.data as never, corn.data as never);
      console.log(merged);

      setMergedState(merged);
    }
  }, [wheat.data, corn.data, mergedData]);

  useEffect(() => {
    const queries = [
      { name: "Wheat", data: wheat.data },
      { name: "Corn", data: corn.data },
    ];

    queries.forEach(({ name, data }) => {
      if (!data) return;

      if ((data as any)["Error Message"]) {
        toast({
          type: "error",
          message: `${name}: ${(data as any)["Error Message"]}`,
        });
      }

      if ((data as any)["Information"]) {
        toast({
          type: "info",
          message: `${name}: ${(data as any)["Information"]}`,
        });
      }
    });
  }, [wheat.data, corn.data]);

  return (
    <>
      <LineDashboard
        isLoading={wheat.isLoading || corn.isLoading}
        data={mergedState}
      />
      <TableData
        isLoading={wheat.isLoading || corn.isLoading}
        data={mergedState}
      >
        <div className="flex flex-row items-center gap-2 w-xs">
          <p className="font-light text-sm">Período:</p>
          <SelectField
            name="interval"
            control={control}
            options={[
              { id: "annual", name: "Anual" },
              { id: "monthly", name: "Mensal" },
              { id: "quarterly", name: "Trimestral" },
            ]}
            optionLabelKey="name"
            optionValueKey="id"
            className="w-full"
          />
        </div>
      </TableData>
    </>
  );
}
