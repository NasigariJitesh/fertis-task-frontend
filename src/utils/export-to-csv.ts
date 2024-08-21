/**
 *
 * @param data
 * @param header
 * @param fileName
 */
export function exportToCSV(data: any[], header: string, fileName: string) {
  const csvContent =
    'data:text/csv;charset=utf-8,' +
    `${header}\n` +
    data
      .map((row) => {
        if (typeof row === 'object' && row !== null) {
          return flattenObject(row).join(',');
        }
        return ''; // Return an empty string if row is not an object
      })
      .join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', fileName + '.csv');
  document.body.append(link);
  link.click();
}

/**
 *
 * @param object
 */
function flattenObject(object: any): string[] {
  const values: string[] = [];

  for (const key in object) {
    if (typeof object[key] === 'object' && object[key] !== null) {
      const childValues = flattenObject(object[key]);
      if (childValues.length > 0) {
        values.push(childValues.join(' '));
      }
    } else {
      values.push(object[key]);
    }
  }

  return values;
}
