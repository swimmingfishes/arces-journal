import * as migration_20260417_193445_init from './20260417_193445_init';

export const migrations = [
  {
    up: migration_20260417_193445_init.up,
    down: migration_20260417_193445_init.down,
    name: '20260417_193445_init'
  },
];
