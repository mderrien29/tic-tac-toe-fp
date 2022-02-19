import { either as E } from 'fp-ts';

import { Board, Tile } from '@app/domain/board';
import { PlayerError } from '@app/domain/error';

export type Pure = (board: Board, move: Tile) => E.Either<PlayerError, Board>

export type Usecase = () => Pure;
