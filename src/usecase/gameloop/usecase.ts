import {
  function as fp,
  taskEither as TE,
  task as T,
  option as O,
} from 'fp-ts';

import { Usecase } from './types';
import { Board, Player, Tile } from '@app/domain/board';

export const gameloop: Usecase = (
  gameboard,
  playMove,
  hasSomeoneWon,
  controller,
) => {
  const initialBoard: Board = [
    [0, 1, 2].flatMap((l) =>
      [0, 1, 2].map((c) =>
        fp.unsafeCoerce<any, Tile>({ pos: { x: l, y: c }, state: null }),
      ),
    ),
  ].flat();

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
      TE.getOrElse((e) =>
        fp.pipe(
          T.of(board),
          T.chainFirst(() => gameboard.reportError(e)),
        ),
      ),
    );

  const isGameOver = (board: Board): boolean =>
    O.isSome(hasSomeoneWon(board)) || board.length >= initialBoard.length + 9;

  const playUntilGameOver =
    (cb: typeof gameTurn) =>
    (board: Board): T.Task<O.Option<Player>> =>
      fp.pipe(
        cb(board),
        T.chain((board) =>
          isGameOver(board)
            ? T.of(hasSomeoneWon(board))
            : playUntilGameOver(cb)(board),
        ),
      );

  return fp.pipe(
    initialBoard,
    playUntilGameOver(gameTurn),
    T.chain(gameboard.showEndGameScreen),
    T.map(fp.constVoid),
  );
};
