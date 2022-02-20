import { either as E } from 'fp-ts';

import { Controller } from '@app/usecase/_adapters/controller';
import { Gameboard } from '@app/usecase/_adapters/gameboard';
import { Pure as PlayMove } from '@app/usecase/playMove/types';
import { Board, Tile } from '@app/domain/board';
import { PlayerError } from '@app/domain/error';

export type Pure = (board: Board, move: Tile) => E.Either<PlayerError, Board>;

export type Usecase = () => Pure;
