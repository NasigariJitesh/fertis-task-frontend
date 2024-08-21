'use client';

import React from 'react';

import { DatePicker, DatePickerProps } from '../ui/datepicker';

/**
 *
 * @param root0
 * @param root0.onClear
 * @param root0.placeholderText
 * @param root0.inputProps
 */
export default function DateFiled({
  onClear,
  placeholderText = 'Select date',
  inputProps,
  ...props
}: DatePickerProps<any> & { onClear?: () => void }) {
  return (
    <div>
      <DatePicker
        monthsShown={1}
        placeholderText={placeholderText}
        selectsRange
        inputProps={{
          inputClassName: 'h-9 [&_input]:text-ellipsis',
          ...inputProps,
        }}
        className="w-72"
        {...props}
      />
    </div>
  );
}
