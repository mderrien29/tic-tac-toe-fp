import {
  function as fp,
  taskEither as TE,
  option as O,
  task as T,
  array as A,
} from 'fp-ts';

import { Gameboard } from '@app/usecase/_adapters/gameboard';
import { Board, Player, Tile } from '@app/domain/board';

export const gameboardConsole = (console: Console): Gameboard => ({
  drawBoard: (board: Board) => () =>
    fp.pipe(
      printBoard(board),
      A.map((line) => console.log(line.map((t) => t.state ?? '.').join(' '))),
      TE.right(fp.constVoid()),
    ),

  reportError: (e) => fp.pipe(console.error(`${e._tag}: ${e.message}`), T.of),

  showEndGameScreen: (player: O.Option<Player>) =>
    fp.pipe(
      player,
      O.matchW(
        () => `No one won...`,
        (p) => `And the winner is... ${p}!`,
      ),
      console.log,
      TE.right,
    ),
});

const printBoard = (board: Board): Tile[][] =>
  [0, 1, 2].map((l) =>
    [0, 1, 2].map(
      (c) =>
        board
          .filter((t) => t.pos.x === c && t.pos.y === l)
          .slice()
          .reverse()
          .slice(0, 1)[0],
    ),
  );
