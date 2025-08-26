"use client";

import { DataTable } from "@/components/DataTable";
import { TablePagination } from "@/components/DataTable/TablePagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import usePagination from "@/hooks/usePagination";
import { Series } from "@/utils/mergeDataSeries";

const columns = [
  {
    header: "Data",
    accessor: "date",
    className: "w-[100px] font-medium",
  },
  {
    header: "Soja",
    accessor: "Global Price of Wheat",
    className: "text-success-600 dark:text-success-400",
  },
  {
    header: "Milho",
    accessor: "Global Price of Corn",
    className: "text-warning-600 dark:text-warning-400",
  },
];

type Props = {
  isLoading: boolean;
  data: Series[];
  children?: React.ReactNode;
};

export default function TableData({ isLoading, data, children }: Props) {
  const { paginationInfo, handlePageChange } = usePagination({
    initialData: data,
    itemsPerPage: 5,
  });

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full rounded-md" />;
  }
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="flex flex-row justify-between">
        <p className="text-xl font-semibold">Dados Históricos</p>
        {children}
      </CardHeader>
      <CardContent>
        <DataTable data={paginationInfo.items} columns={columns} />
      </CardContent>
      <CardFooter className="flex justify-end">
        <TablePagination
          currentPage={paginationInfo.currentPage}
          totalPages={paginationInfo.totalPages}
          onPageChange={handlePageChange}
        />
      </CardFooter>
    </Card>
  );
}
