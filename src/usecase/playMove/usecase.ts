import {
  function as fp,
  either as E,
  array as A,
} from 'fp-ts';

import { Board, Tile, Position } from '@app/domain/board';

import { Usecase } from './types';
import {PlayerError} from '@app/domain/error';

export const playMove: Usecase = () => (board: Board, move: Tile) =>
  fp.pipe(board,
          E.fromPredicate(
            isMoveIllegal(move),
            _ => illegalMoveError,
          ),
          _ => _,
          E.map(A.append(move)));


const isMoveIllegal = (move: Tile) => (board: Board): boolean => fp.pipe(
  board.reverse().find(isTileAtPosition(move.pos)),
  isTileEmpty,
);

const isTileAtPosition =
  (pos: Position) =>
  (tile: Tile): boolean =>
    tile.pos.x === pos.x && tile.pos.y === pos.y;

const isTileEmpty = (tile: Tile | undefined) => !tile || !tile.state;

const illegalMoveError: PlayerError = { _tag: 'PlayerError', message: 'Move is illegal' };
