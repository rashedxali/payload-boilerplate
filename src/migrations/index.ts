import * as migration_20260802_065609_blocks_as_json from './20260802_065609_blocks_as_json';
import * as migration_20261001_160541_integrations_and_newsletter from './20261001_160541_integrations_and_newsletter';
import * as migration_20261001_164625_boilerplate_cleanup from './20261001_164625_boilerplate_cleanup';

export const migrations = [
  {
    up: migration_20260802_065609_blocks_as_json.up,
    down: migration_20260802_065609_blocks_as_json.down,
    name: '20260802_065609_blocks_as_json',
  },
  {
    up: migration_20261001_160541_integrations_and_newsletter.up,
    down: migration_20261001_160541_integrations_and_newsletter.down,
    name: '20261001_160541_integrations_and_newsletter',
  },
  {
    up: migration_20261001_164625_boilerplate_cleanup.up,
    down: migration_20261001_164625_boilerplate_cleanup.down,
    name: '20261001_164625_boilerplate_cleanup'
  },
];
