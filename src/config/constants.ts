export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AZURE_KEY = process.env.AZURE_API;

export const ROW_PER_PAGE_OPTIONS = [
	{ value: 5, name: '5' },
	{ value: 10, name: '10' },
	{ value: 15, name: '15' },
	{ value: 20, name: '20' },
];

export const INITIAL_MAP_LOCATION = {
	latitude: 17.6868,
	longitude: 83.2185,
	zoom: 5,
};
