import Image from 'next/image';
import NotFoundImg from 'public/not-found.png';
import { ReactNode } from 'react';

import cn from '@/utils/class-names';

interface NotificationHeaderProperties {
	title?: string;
	message?: string;
	imageSrc?: string;
	className?: string;
	children?: ReactNode;
}

const NotificationHeader = ({
	title,
	message,
	imageSrc,
	children,
	className,
}: NotificationHeaderProperties) => (
	<div className={cn('flex grow items-center px-6 xl:px-10', className)}>
		<div className='mx-auto text-center'>
			<Image
				src={imageSrc || NotFoundImg}
				alt='Notification Image'
				className='mx-auto mb-8 max-w-xs'
			/>
			<h1 className='text-gray-1000 text-lg font-bold'>{title}</h1>
			<p className='mt-3 text-sm text-gray-500'>{message}</p>
			{children}
		</div>
	</div>
);

export default NotificationHeader;
