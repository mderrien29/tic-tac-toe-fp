import { function as fp, taskEither as TE, task as T, option as O } from 'fp-ts';

import { Usecase } from './types';
import { Board, Player } from '@app/domain/board';

export const gameloop: Usecase = (gameboard, playMove, controller) => {
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

  const hasSomeoneWon = (board: Board) => O.none; // TODO
  const isBoardFull = (board: Board) => board.length >= 9;
  const isGameOver = (board: Board): boolean => O.isSome(hasSomeoneWon(board)) || isBoardFull(board);

  const playUntilGameOver = (cb: typeof gameTurn) => (board: Board): T.Task<O.Option<Player>> => fp.pipe(
    cb(board),
    T.chain(board => isGameOver(board) ? T.of(hasSomeoneWon(board)) : playUntilGameOver(cb)(board))
  );

  return fp.pipe(
    initialBoard,
    playUntilGameOver(gameTurn),
    T.chain(gameboard.showEndGameScreen),
    T.map(fp.constVoid)
  );
};
