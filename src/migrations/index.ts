import * as migration_20260412_092929_init from './20260412_092929_init';

export const migrations = [
  {
    up: migration_20260412_092929_init.up,
    down: migration_20260412_092929_init.down,
    name: '20260412_092929_init'
  },
];
