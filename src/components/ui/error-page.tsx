import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { PiHouseLineBold } from 'react-icons/pi';
import { RxReload } from 'react-icons/rx';

import cn from '@/utils/class-names';

import { Button } from './button';
import NotificationHeader from './notification-header';

interface ActionButtonProperties {
	Icon: IconType;
	title: string;
	handler: () => void;
	className?: string;
}

export interface ErrorPageProperties {
	reloadHandler: () => void;
	path?: string;
	title?: string;
	message?: string;
	imageSrc?: string;
	backTitle?: string;
	className?: string;
	reloadTitle?: string;
	children?: ReactNode;
	backHandler?: () => void;
	backButtonClassName?: string;
	reloadButtonClassName?: string;
}

const ActionButton = ({
	Icon,
	handler,
	title,
	className,
}: ActionButtonProperties) => (
	<Button
		size='xl'
		tag='span'
		color='primary'
		onClick={handler}
		className={cn(
			'mt-8 h-12 px-4 xl:h-14 xl:px-6 cursor-pointer select-none',
			className,
		)}>
		<Icon className='mr-1.5 text-lg' />
		{title}
	</Button>
);

const ErrorPage = ({
	backTitle = 'Back to Home',
	reloadTitle = 'Try again...',
	title = 'Oops, something went wrong',
	message = 'Join our mailing list to get the latest updates',
	path,
	children,
	imageSrc,
	className,
	backHandler,
	reloadHandler,
	backButtonClassName,
	reloadButtonClassName,
}: ErrorPageProperties) => {
	const router = useRouter();

	const defaultBackHandler = path
		? () => router.push(path)
		: () => router.back();

	return (
		<NotificationHeader
			title={title}
			message={message}
			imageSrc={imageSrc}
			className={className}>
			{children || (
				<div className='flex items-center justify-around'>
					<ActionButton
						Icon={RxReload}
						handler={reloadHandler}
						title={reloadTitle}
						className={backButtonClassName}
					/>
					<ActionButton
						Icon={PiHouseLineBold}
						handler={backHandler || defaultBackHandler}
						title={backTitle}
						className={reloadButtonClassName}
					/>
				</div>
			)}
		</NotificationHeader>
	);
};

export default ErrorPage;
