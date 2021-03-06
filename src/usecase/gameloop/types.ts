import { task as T } from 'fp-ts';

import { Pure as PlayMove } from '@app/usecase/playMove/types';
import { Pure as HasPlayerWon } from '@app/usecase/hasSomeoneWon/types';
import { Gameboard } from '../_adapters/gameboard';
import { Controller } from '../_adapters/controller';

export type Pure = T.Task<void>;

export type Usecase = (
  gameboard: Gameboard,
  playMove: PlayMove,
  hasPlayerWon: HasPlayerWon,
  controller: Controller,
) => Pure;
