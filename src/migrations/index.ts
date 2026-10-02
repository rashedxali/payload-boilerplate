import * as migration_20261002_092056_initial from './20261002_092056_initial';

export const migrations = [
  {
    up: migration_20261002_092056_initial.up,
    down: migration_20261002_092056_initial.down,
    name: '20261002_092056_initial'
  },
];
