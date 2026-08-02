import * as migration_20260802_065609_blocks_as_json from './20260802_065609_blocks_as_json';

export const migrations = [
  {
    up: migration_20260802_065609_blocks_as_json.up,
    down: migration_20260802_065609_blocks_as_json.down,
    name: '20260802_065609_blocks_as_json'
  },
];
