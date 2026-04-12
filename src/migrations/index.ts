import * as migration_20260410_030353_initialize from './20260410_030353_initialize';
import * as migration_20260410_153734_add_news_fields_for_preview from './20260410_153734_add_news_fields_for_preview';
import * as migration_20260412_044313_fix_issue from './20260412_044313_fix_issue';

export const migrations = [
  {
    up: migration_20260410_030353_initialize.up,
    down: migration_20260410_030353_initialize.down,
    name: '20260410_030353_initialize',
  },
  {
    up: migration_20260410_153734_add_news_fields_for_preview.up,
    down: migration_20260410_153734_add_news_fields_for_preview.down,
    name: '20260410_153734_add_news_fields_for_preview',
  },
  {
    up: migration_20260412_044313_fix_issue.up,
    down: migration_20260412_044313_fix_issue.down,
    name: '20260412_044313_fix_issue'
  },
];
