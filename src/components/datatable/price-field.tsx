'use client';

import React, { useEffect, useState } from 'react';

import { Input } from '../ui/input';
import { Text } from '../ui/text';

type PriceFieldTypes = {
	label?: string;
	value: string[];
	// eslint-disable-next-line no-empty-pattern
	onChange: ([]: string[]) => void;
};

/**
 *
 * @param root0
 * @param root0.label
 * @param root0.value
 * @param root0.onChange
 */
export default function PriceField({
	label = 'Amount',
	value,
	onChange,
}: PriceFieldTypes) {
	const [minPrice, setMinPrice] = useState(value[0] ?? '');
	const [maxPrice, setMaxPrice] = useState(value[1] ?? '');

	/**
	 *
	 * @param price
	 */
	function handleMinPrice(price: string) {
		setMinPrice(() => price);
		onChange([price, maxPrice]);
	}

	/**
	 *
	 * @param price
	 */
	function handleMaxPrice(price: string) {
		setMaxPrice(() => price);
		onChange([minPrice, price]);
	}

	useEffect(() => {
		setMinPrice(value[0]);
		setMaxPrice(value[1]);
	}, [value]);

	return (
		<div className='price-field flex items-center'>
			<Text
				tag='span'
				className='mr-2 whitespace-nowrap font-medium text-gray-500'>
				{label}
			</Text>
			<div className='flex items-center'>
				<Input
					prefix={'$'}
					inputClassName='w-24 h-9'
					type='number'
					placeholder='0.00'
					min={0}
					value={minPrice}
					onChange={(event: { target: { value: string } }) =>
						handleMinPrice(event.target.value)
					}
				/>
				<Text tag='span' className='mx-1.5 h-0.5 w-3 bg-gray-200' />
				<Input
					prefix={'$'}
					min={Number(minPrice)}
					inputClassName='w-24 h-9'
					type='number'
					placeholder='100.00'
					value={maxPrice}
					onChange={(event: { target: { value: string } }) =>
						handleMaxPrice(event.target.value)
					}
					disabled={minPrice.length === 0}
				/>
			</div>
		</div>
	);
}
