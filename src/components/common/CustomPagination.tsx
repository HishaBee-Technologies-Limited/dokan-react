'use client';

import React from 'react';
import {
  Pagination as SPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { pagination } from '@/lib/paginator';

type PaginationPropsDef = {
  pageCount: number;
  currentPage: number;
  lastPage: number;
  onChanage: (page: number) => void;
};

const Pagination = ({
  currentPage,
  lastPage,
  pageCount,
  onChanage,
}: PaginationPropsDef) => (
  <SPagination className="mt-10">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          size="sm"
          onClick={() => onChanage(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer rounded-sm"
        />
      </PaginationItem>

      {pagination(currentPage, pageCount, 7).map((item, index) => {
        if (isNaN(Number(item))) {
          return (
            <PaginationItem key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          );
        }

        return (
          <PaginationItem key={index}>
            <PaginationButton
              size="sm"
              isActive={currentPage === item}
              onClick={() => onChanage(Number(item))}
              className="px-6 py-4 rounded-sm"
            >
              {item}
            </PaginationButton>
          </PaginationItem>
        );
      })}

      <PaginationItem>
        <PaginationNext
          size="sm"
          onClick={() => onChanage(currentPage + 1)}
          disabled={lastPage === currentPage}
          className="px-6 rounded-sm"
        />
      </PaginationItem>
    </PaginationContent>
  </SPagination>
);

export default Pagination;
