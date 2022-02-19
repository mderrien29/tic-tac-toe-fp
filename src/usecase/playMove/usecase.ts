import { function as fp, either as E, array as , boolean as BA } from 'fp-ts';

import { Board, Tile, Position } from '@app/domain/board';

import { Usecase } from './types';
import { PlayerError } from '@app/domain/error';

export const playMove: Usecase = () => (board: Board, move: Tile) =>
  fp.pipe(
    board,
    E.fromPredicate(isMoveLegal(move), (_) => illegalMoveError),
    E.map(A.append(move)),
  );

const isMoveLegal =
  (move: Tile) =>
  (board: Board): boolean =>
    isPlayerTurn(move, board) && isNotOverridingTile(move, board);

const isPlayerTurn = (tile: Tile, board: Board): boolean =>
  tile.state !== board[board.length - 1]?.state;

const isNotOverridingTile = (move: Tile, board: Board) =>
  fp.pipe(board.reverse().find(isTileAtPosition(move.pos)), isTileEmpty);

const isTileAtPosition =
  (pos: Position) =>
  (tile: Tile): boolean =>
    tile.pos.x === pos.x && tile.pos.y === pos.y;

const isTileEmpty = (tile: Tile | undefined) => !tile || !tile.state;

const illegalMoveError: PlayerError = {
  _tag: 'PlayerError',
  message: 'Move is illegal',
};
