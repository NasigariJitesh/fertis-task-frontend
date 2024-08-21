import React from 'react';

import Select, { SelectBoxProps, SelectOption } from '../ui/select';

/**
 *
 * @param root0
 * @param root0.placeholder
 */
export default function StatusField({ placeholder = 'Select status', ...props }: SelectBoxProps<SelectOption>) {
  return (
    <Select
      placeholder={placeholder}
      selectClassName='h-9 min-w-[150px]'
      dropdownClassName='p-1.5'
      optionClassName='h-9'
      {...props}
    />
  );
}
