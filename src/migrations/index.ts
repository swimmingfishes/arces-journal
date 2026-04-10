import * as migration_20260410_030353_initialize from './20260410_030353_initialize';
import * as migration_20260410_153734_add_news_fields_for_preview from './20260410_153734_add_news_fields_for_preview';

export const migrations = [
  {
    up: migration_20260410_030353_initialize.up,
    down: migration_20260410_030353_initialize.down,
    name: '20260410_030353_initialize',
  },
  {
    up: migration_20260410_153734_add_news_fields_for_preview.up,
    down: migration_20260410_153734_add_news_fields_for_preview.down,
    name: '20260410_153734_add_news_fields_for_preview'
  },
];
