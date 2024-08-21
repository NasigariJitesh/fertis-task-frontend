import React from 'react';

import cn from '@/utils/class-names';

import { Avatar, AvatarProps as AvatarProperties } from './avatar';
import { Text } from './text';

interface AvatarCardProperties {
	src: string;
	name: string;
	className?: string;
	description?: string;
	avatarProps?: AvatarProperties;
}

/**
 *
 * @param root0
 * @param root0.src
 * @param root0.name
 * @param root0.className
 * @param root0.description
 * @param root0.avatarProps
 */
export default function AvatarCard({
	src,
	name,
	className,
	description,
	avatarProps,
}: AvatarCardProperties) {
	return (
		<figure className={cn('flex items-center gap-3', className)}>
			<Avatar name={name} src={src} {...avatarProps} />
			<figcaption className='grid gap-0.5'>
				<Text className='font-lexend text-sm font-medium text-gray-900 dark:text-gray-700'>
					{name}
				</Text>
				{description && (
					<Text className='text-[13px] text-gray-500'>{description}</Text>
				)}
			</figcaption>
		</figure>
	);
}
