import React from 'react';
import { Button } from 'rizzui';

import cn from '@/utils/class-names';

interface FormFooterProperties {
	className?: string;
	submitBtnText?: string;
	isLoading?: boolean;
	isDisabled?: boolean;
}

export const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';

/**
 *
 * @param root0
 * @param root0.isLoading
 * @param root0.submitBtnText
 * @param root0.className
 * @param root0.isDisabled
 */
export default function FormFooter({
	isLoading,
	submitBtnText: submitButtonText = 'Submit',
	className,
	isDisabled = false,
}: FormFooterProperties) {
	return (
		<div
			className={cn(
				'3xl:px-8 4xl:px-10 sticky bottom-0 left-0 right-0 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 dark:bg-gray-50 md:px-5 lg:px-6',
				className,
				negMargin,
			)}>
			<Button
				type='submit'
				disabled={isDisabled}
				isLoading={isLoading}
				className='@xl:w-auto w-full dark:bg-gray-100 dark:text-white dark:active:bg-gray-100'>
				{submitButtonText}
			</Button>
		</div>
	);
}
