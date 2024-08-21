import { pathOr } from 'ramda';
import is from 'ramda/es/is';
import { useEffect, useMemo, useState } from 'react';

import { debounce } from '@/utils/debouncing';

interface AnyObject {
  [key: string]: any;
}

/**
 *
 * @param initialData
 * @param countPerPage
 * @param initialFilterState
 * @param handleRefetch
 * @param sortRefetchConfig
 * @param sortRefetchConfig.sortOrder
 * @param sortRefetchConfig.sortField
 */
export function useTable<T extends AnyObject>(
  initialData: T[],
  countPerPage = 10,
  initialFilterState?: Partial<Record<string, any>>,
  handleRefetch?: (data: string | { sortOrder: string; sortField: string }) => void,
  sortRefetchConfig?: { sortOrder: string; sortField: string },
) {
  const [data, setData] = useState(initialData);
  /*
   * Dummy loading state.
   */
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleUpdateExistingData = (newData: T[]) => {
    setData([...newData]);
  };

  /*
   * Handle row selection
   */
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const handleRowSelect = (recordKey: string) => {
    const selectedKeys = [...selectedRowKeys];
    if (selectedKeys.includes(recordKey)) {
      setSelectedRowKeys(selectedKeys.filter((key) => key !== recordKey));
    } else {
      setSelectedRowKeys([...selectedKeys, recordKey]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRowKeys.length === data.length) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys(data.map((record) => record.id));
    }
  };

  /*
   * Handle sorting
   */
  const [sortConfig, setSortConfig] = useState<AnyObject>({
    key: null,
    direction: null,
  });

  /**
   *   @param existingData
   * @param existingData
   * @param sortKey
   * @param sortDirection
   */
  function sortData(existingData: T[], sortKey: string, sortDirection: string) {
    return [...existingData].sort((a, b) => {
      const aValue = pathOr('', sortKey?.split('.'), a);
      const bValue = pathOr('', sortKey?.split('.'), b);

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const sortedData = useMemo(() => {
    const newData = data;
    if (!sortConfig.key) {
      return newData;
    }
    return sortData(newData, sortConfig.key, sortConfig.direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortConfig, data]);

  /**
   *
   * @param key
   */
  function handleSort(key: string) {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }

  /*
   * Handle pagination
   */
  const [currentPage, setCurrentPage] = useState(1);
  /**
   *
   * @param newData
   */
  function paginatedData(newData: T[] = sortedData) {
    const start = (currentPage - 1) * countPerPage;
    const end = start + countPerPage;

    if (newData?.length > start) return newData.slice(start, end);
    return newData;
  }

  /**
   *
   * @param pageNumber
   */
  function handlePaginate(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  /*
   * Handle delete
   */
  /**
   *
   * @param id
   */
  function handleDelete(id: string | string[]) {
    setData((previousData) => {
      const updatedData = [...previousData];
      const newData = Array.isArray(id)
        ? updatedData.filter((item) => !id.includes(item.id))
        : updatedData.filter((item) => item.id !== id);
      return [...newData];
    });
  }

  /*
   * Handle Filters and searching
   */
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>(initialFilterState ?? {});

  /**
   *
   * @param columnId
   * @param filterValue
   */
  function updateFilter(columnId: string, filterValue: string | any[]) {
    if (!Array.isArray(filterValue) && !is(String, filterValue)) {
      throw new Error('filterValue data type should be string or array of any');
    }

    if (Array.isArray(filterValue) && filterValue.length !== 2) {
      throw new Error('filterValue data must be an array of length 2');
    }

    setFilters((previousFilters) => ({
      ...previousFilters,
      [columnId]: filterValue,
    }));
  }

  /**
   *
   */
  function applyFilters() {
    const searchTermLower = searchTerm.toLowerCase();

    return (
      sortedData
        .filter((item) => {
          const isMatchingItem = Object.entries(filters)

            .filter(([, value]) => !!value)
            .every(([columnId, filterValue]) => {
              if (Array.isArray(filterValue) && typeof filterValue[1] === 'object') {
                const itemValue = new Date(item[columnId]);
                return (
                  // @ts-ignore
                  itemValue >= filterValue[0] && itemValue <= filterValue[1]
                );
              }
              if (Array.isArray(filterValue) && typeof filterValue[1] === 'string') {
                const itemPrice = Math.ceil(Number(item[columnId]));
                return itemPrice >= Number(filterValue[0]) && itemPrice <= Number(filterValue[1]);
              }
              if (is(String, filterValue) && !Array.isArray(filterValue)) {
                const colId = pathOr('', columnId?.split('.'), item);

                const itemValue = colId?.toString().toLowerCase();

                if (itemValue !== filterValue.toString().toLowerCase()) {
                  return false;
                }
                return true;
              }
            });
          return isMatchingItem;
        })
        // global search after running filters
        .filter((item) =>
          Object.values(item).some((value) =>
            typeof value === 'object'
              ? value &&
                Object.values(value).some(
                  (nestedItem) => nestedItem && String(nestedItem).toLowerCase().includes(searchTermLower),
                )
              : value && String(value).toLowerCase().includes(searchTermLower),
          ),
        )
    );
  }

  /*
   * Handle searching
   */
  /**
   *
   * @param searchValue
   */
  function handleSearch(searchValue: string) {
    setSearchTerm(searchValue);
  }

  /**
   *
   */
  function searchedData() {
    if (!searchTerm) return sortedData;

    const searchTermLower = searchTerm.toLowerCase();

    return sortedData.filter((item) =>
      Object.values(item).some((value) =>
        typeof value === 'object'
          ? value &&
            Object.values(value).some(
              (nestedItem) => nestedItem && String(nestedItem).toLowerCase().includes(searchTermLower),
            )
          : value && String(value).toLowerCase().includes(searchTermLower),
      ),
    );
  }

  /*
   * Reset search and filters
   */
  /**
   *
   */
  function handleReset() {
    setData(() => initialData);
    handleSearch('');
    if (initialFilterState) return setFilters(initialFilterState);
  }

  /*
   * Set isFiltered and final filtered data
   */

  /**
   *
   * @param object
   */
  function checkForFilters(object: Record<string, any>): boolean {
    for (const key in object) {
      if (key in object && object[key]) {
        if (Array.isArray(object[key])) {
          if (object[key][0] !== null && object[key][1] !== null) return true;
        } else {
          return true;
        }
      }
    }
    return false;
  }

  const isFiltered = checkForFilters(filters);

  /**
   *
   */
  function calculateTotalItems() {
    if (isFiltered) {
      return applyFilters().length;
    }
    if (searchTerm) {
      return searchedData().length;
    }
    return sortedData.length;
  }
  const filteredAndSearchedData = isFiltered ? applyFilters() : searchedData();
  const tableData = paginatedData(filteredAndSearchedData);

  /*
   * Go to first page when data is filtered and searched
   */
  useEffect(() => {
    handlePaginate(1);
  }, [isFiltered, searchTerm]);

  // Search using handleRefetch

  const [refetchSearchQuery, setRefetchSearchQuery] = useState('');

  const debouncedSearch = debounce(() => {
    if (handleRefetch) handleRefetch(refetchSearchQuery);
  }, 1000);

  useEffect(() => {
    if (handleRefetch) debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchSearchQuery]);

  // handle sort using refetch

  /**
   *
   * @param sortField
   */
  function handleRefetchSort(sortField: string) {
    let sortOrder = 'asc';

    if (sortRefetchConfig && sortRefetchConfig.sortField === sortField && sortRefetchConfig.sortOrder === 'asc')
      sortOrder = 'desc';

    if (handleRefetch) handleRefetch({ sortField, sortOrder });
  }

  // useTable returns
  return {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    handlePaginate,
    totalItems: calculateTotalItems(),
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    searchTerm,
    handleSearch,
    filters,
    updateFilter,
    applyFilters,
    handleDelete,
    handleReset,
    handleRefetchSort,
    refetchSearchQuery,
    setRefetchSearchQuery,
    handleUpdateExistingData,
  };
}
