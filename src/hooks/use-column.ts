'use client';

import { useMemo, useState } from 'react';

import { filterData } from '../utils/filter-data';

/**
 *
 * @param columnsData
 */
export function useColumn<T extends Record<string, any>>(columnsData: T[]) {
	const [checkedColumns, setCheckedColumns] = useState(
		columnsData.map((column) => column.dataIndex),
	);

	const visibleColumns = useMemo(
		() => filterData(columnsData, checkedColumns),
		[columnsData, checkedColumns],
	);

	return { visibleColumns, checkedColumns, setCheckedColumns };
}
