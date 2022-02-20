import {
  function as fp,
  taskEither as TE,
  task as T,
  option as O,
} from 'fp-ts';

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

  // TODO cleanup when not tired
  const hasSomeoneWon = (board: Board): O.Option<Player> =>
    fp.pipe(
      [
        [0, 1, 2].map((line) =>
          allEqual(
            board
              .filter((tile) => tile.pos.x === line)
              .map((tile) => tile.state),
          ),
        ),
        [0, 1, 2].map((col) =>
          allEqual(
            board
              .filter((tile) => tile.pos.y === col)
              .map((tile) => tile.state),
          ),
        ),
        allEqual(
          [0, 1, 2]
            .map((diag) =>
              board
                .filter((tile) => tile.pos.y === diag && tile.pos.x === diag)
                .map((tile) => tile.state),
            )
            .flat(),
        ),
        allEqual(
          [0, 1, 2]
            .map((diag2) =>
              board
                .filter(
                  (tile) =>
                    tile.pos.y === diag2 && tile.pos.x === Math.abs(-diag2),
                )
                .map((tile) => tile.state),
            )
            .flat(),
        ),
      ]
        .flat()
        .find((v) => O.isSome(v)),
      O.fromNullable,
      O.flatten,
    );

  const isBoardFull = (board: Board) => board.length >= 9;
  const isGameOver = (board: Board): boolean =>
    O.isSome(hasSomeoneWon(board)) || isBoardFull(board);

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

const allEqual = (strArr: Player[]): O.Option<Player> =>
  strArr.length === 3 && strArr.every((s) => s === strArr[0])
    ? O.some(strArr[0])
    : O.none;
