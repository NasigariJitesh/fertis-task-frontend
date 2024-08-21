'use client';

import dynamic from 'next/dynamic';
import isEmpty from 'ramda/es/isEmpty';
import React from 'react';

import cn from '@/utils/class-names';

import Spinner from '../ui/spinner';
import Table, { type TableProperties } from '../ui/table';
import { Text } from '../ui/text';
import type { TableFilterProps } from './table-filter';
import type { TablePaginationProps } from './table-pagination';

const TableFilter = dynamic(() => import('./table-filter'), { ssr: false });
const TablePagination = dynamic(() => import('./table-pagination'), {
  ssr: false,
});

type ControlledTableProps = {
  isLoading?: boolean;
  showLoadingText?: boolean;
  filterElement?: React.ReactElement;
  filterOptions?: TableFilterProps;
  paginatorOptions?: TablePaginationProps;
  tableFooter?: React.ReactNode;
  className?: string;
  paginatorClassName?: string;
} & TableProperties;

/**
 *
 * @param root0
 * @param root0.isLoading
 * @param root0.filterElement
 * @param root0.filterOptions
 * @param root0.paginatorOptions
 * @param root0.tableFooter
 * @param root0.showLoadingText
 * @param root0.paginatorClassName
 * @param root0.className
 */
export default function ControlledTable({
  isLoading,
  filterElement,
  filterOptions,
  paginatorOptions,
  tableFooter,
  showLoadingText,
  paginatorClassName,
  className,
  ...tableProps
}: ControlledTableProps) {
  if (isLoading) {
    return (
      <div className='grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center'>
        <Spinner size='xl' />
        {showLoadingText ? (
          <Text tag='h6' className='-me-2 mt-4 font-medium text-gray-500'>
            Loading...
          </Text>
        ) : null}
      </div>
    );
  }

  return (
    <>
      {/* @ts-ignore */}
      {!isEmpty(filterOptions) && <TableFilter {...filterOptions}>{filterElement}</TableFilter>}

      <div className='relative'>
        <Table rowKey={(record) => record.id} className={cn(className)} {...tableProps} />

        {tableFooter || null}
      </div>

      {/* @ts-ignore */}
      {!isEmpty(paginatorOptions) && <TablePagination paginatorClassName={paginatorClassName} {...paginatorOptions} />}
    </>
  );
}
