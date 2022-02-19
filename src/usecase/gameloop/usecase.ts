import { function as fp, taskEither as TE, task as T } from 'fp-ts';

import { Usecase } from './types';
import { Board } from '@app/domain/board';

export const gameloop: Usecase = (gameboard, playMove, controller) => () => {
  const initialBoard: Board = [];

  const gameTurn = (board: Board): T.Task<Board> =>
    fp.pipe(
      TE.right(board),
      TE.chainFirst(gameboard.drawBoard),
      TE.chainW((board) =>
        fp.pipe(
          controller.getNextMove(),
          T.map((move) => playMove(board, move)),
        ),
      ),
      TE.getOrElse((_) => gameTurn(board)),
    );

  const hasSomeoneWon = (board: Board) => false; // TODO
  const isBoardFull = (board: Board) => board.length >= 9;

  const loopUntilGameOver = (cb: typeof gameTurn) => (board: Board) =>
    Array.from(Array(9), () => cb).reduce(
      async (prev, cur) => cur(await prev)(),
      Promise.resolve(board),
    );

  return fp.pipe(initialBoard, loopUntilGameOver(gameTurn));
};
