/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

interface PaginationInfo<T> {
  totalItems: number;
  limit: number;
  totalPages: number;
  currentPage: number;
  items: T[];
}

interface UsePaginationProps<T> {
  initialData: T[];
  itemsPerPage: number;
}

interface UsePaginationResult<T> {
  paginationInfo: PaginationInfo<T>;
  handlePageChange: (pageNumber: number) => void;
}

export default function usePagination<T>({
  initialData,
  itemsPerPage = 5,
}: UsePaginationProps<T>): UsePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages: number = Math.ceil(initialData.length / itemsPerPage);

  const paginatedData = (): any[] => {
    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    return initialData.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber: number): void => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const paginationInfo: PaginationInfo<T> = {
    totalItems: initialData.length,
    limit: itemsPerPage,
    totalPages,
    currentPage,
    items: paginatedData(),
  };

  return { paginationInfo, handlePageChange };
}
