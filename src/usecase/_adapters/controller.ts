import { task as T } from 'fp-ts';

import { Tile } from '@app/domain/board';

export interface Controller {
  getNextMove(): T.Task<Tile>;
}
