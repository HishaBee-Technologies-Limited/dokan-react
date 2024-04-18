'use client';
import React from 'react';
import ProductListSorting from '@/components/product/ProductListSorting';
import ProductSearching from '@/components/product/ProductSearching';

export const ProductQueries = () => {
  return (
    <div className="flex gap-space12">
      <ProductSearching />
      <ProductListSorting />
    </div>
  );
};
