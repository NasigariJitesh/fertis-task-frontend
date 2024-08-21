/**
 *
 * @param string_
 */
export function addSpacesToCamelCase(string_: string) {
	return string_.replace(/([a-z])([A-Z])/g, '$1 $2');
}
