/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Column<T> = {
  header: string;
  accessor: keyof T;
  className?: string;
};

type DataTableProps<T extends Record<string, any>> = {
  data: T[];
  columns: Column<T>[];
  footer?: React.ReactNode;
};

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  footer,
}: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader className="bg-secondary">
        <TableRow>
          {columns.map((col) => (
            <TableHead key={String(col.accessor)} className={col.className}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            {columns.map((col) => (
              <TableCell key={String(col.accessor)} className={col.className}>
                {row[col.accessor]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      {footer && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length}>{footer}</TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
