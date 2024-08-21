import dayjs from 'dayjs';

/**
 *
 * @param key
 * @param value
 */
export default function formatValueWithUnit(
	key: string,
	value: number | string,
) {
	const units: { [key: string]: string } = {
		temperature: '°C', // Degree Celsius
		humidity: '%', // Percentage
		latitude: '°', // Degrees
		longitude: '°', // Degrees
		quality: '', // No unit
		satellites: '', // No unit
		remainingBatteryPerc: '%', // Percentage
		hemiSphere: '', // No unit
		distance: 'm', // Meters
		headingGPS: '°', // Degrees
		track: '', // No unit
		speed: 'm/s', // Meters per second
		HDOP: '', // No unit
		altitude: 'm', // Meters
		rotationX: '°', // Degrees
		rotationY: '°', // Degrees
		rotationZ: '°', // Degrees
		accelerationX: 'm/s²', // Meters per second squared
		accelerationY: 'm/s²', // Meters per second squared
		accelerationZ: 'm/s²', // Meters per second squared
		magneticStrengthX: 'T', // Tesla
		magneticStrengthY: 'T', // Tesla
		magneticStrengthZ: 'T', // Tesla
		geoidalSeparation: 'm', // Meters
		magnetometerXCalibrated: '', // No unit
		magnetometerYCalibrated: '', // No unit
		magnetometerZCalibrated: '', // No unit
		storageUsageInPercentage: '%', // Percentage
		lockingPinPresent: '', // No unit
		lockStatus: '', // No unit
		sleepDurationInSeconds: 's', // Seconds
		remainingBatteryPercentage: '%', // Percentage
	};

	return key === 'updatedAt' || key === 'createdAt'
		? dayjs(value).format('DD/MM/YYYY')
		: (units[key]
		? `${value}${units[key]}`
		: value);
}
