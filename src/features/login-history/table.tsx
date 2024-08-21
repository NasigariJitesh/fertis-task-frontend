'use client';
import { useEffect, useMemo, useState } from 'react';

import { ControlledTable } from '@/components';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import { useAuth } from '@/providers/authentication/provider';

import { getColumns } from './columns';
import { useLoginHistory } from './use-queries';

/**
 *
 */
export default function LoginHistoryTable() {
  const [pageSize, setPageSize] = useState(10);

  const { getToken, getUser } = useAuth();
  const token = getToken();
  const user = getUser();

  const { data: loginHistory, isFetching } = useLoginHistory({
    authToken: token ?? undefined,
    userId: user?._id,
  });

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });
  const {
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    isLoading,

    handleUpdateExistingData,
  } = useTable(loginHistory ?? [], pageSize);

  const columns = useMemo(
    () =>
      getColumns({
        sortConfig,
        onHeaderCellClick,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onHeaderCellClick, sortConfig.key, sortConfig.direction],
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } = useColumn(columns);

  useEffect(() => {
    handleUpdateExistingData(loginHistory ?? []);
  }, [loginHistory]);

  return (
    <div className='w-full'>
      <ControlledTable
        variant='modern'
        showLoadingText={true}
        isLoading={isLoading || isFetching}
        data={tableData}
        rowClassName={() => 'cursor-pointer bg-gray-100/30'}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event) => {
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          columns,
          checkedColumns,
          setCheckedColumns,
        }}
        className='w-full min-w-[400px] overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0'
      />
    </div>
  );
}
