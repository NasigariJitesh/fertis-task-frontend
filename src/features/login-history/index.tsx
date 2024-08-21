import React from 'react';

import LoginHistoryTable from './table';

const LoginHistory = () => {
  return (
    <div className='w-full flex flex-col gap-6'>
      <h4 className='text-lg'>Login History</h4>

      <LoginHistoryTable />
    </div>
  );
};

export default LoginHistory;
