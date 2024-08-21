import dayjs from 'dayjs';

/**
 *
 * @param date
 * @param format
 */
export function formatDate(
	date?: Date,
	format = 'DD MMM, YYYY',
): string {
	if (!date) return '';
	return dayjs(date).format(format);
}
