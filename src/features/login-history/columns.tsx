import DateCell from '@/components/ui/date-cell';
import { HeaderCell } from '@/components/ui/table';

import { LoginHistory } from './use-queries';

type Columns = {
  sortConfig?: any;
  onHeaderCellClick: (value: string) => void;
};

export const getColumns = ({ sortConfig, onHeaderCellClick }: Columns) => [
  {
    title: (
      <HeaderCell
        title='Timestamp'
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'timestamp'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('timestamp'),
    dataIndex: 'timestamp',
    key: 'timestamp',
    width: 250,
    render: (timestamp: number) => {
      return <div>{<DateCell date={new Date(timestamp)} />}</div>;
    },
  },

  {
    title: (
      <HeaderCell title='Email' sortable ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'email'} />
    ),
    onHeaderCell: () => onHeaderCellClick('email'),
    dataIndex: 'user.email',
    key: 'email',
    width: 250,
    render: (_: any, row: LoginHistory) => {
      return row.user.email;
    },
  },
];
