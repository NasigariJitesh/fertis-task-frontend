import React from 'react';

import { Text } from './text';

const ArchiveOrRestore = [
  { name: 'Archive', value: 'Archive' },
  { name: 'Restore', value: 'Restore' },
];

export const archiveRestoreOptions = ArchiveOrRestore.map(({ name, value }) => ({
  label: <Text className="ms-2">{name}</Text>,
  name,
  value,
}));
