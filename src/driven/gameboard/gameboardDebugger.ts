import {
  function as fp,
  taskEither as TE,
  option as O,
  task as T,
} from 'fp-ts';

import { Gameboard } from '@app/usecase/_adapters/gameboard';
import { Board, Player } from '@app/domain/board';

export const gameboardDebugger = (console: Console): Gameboard => ({
  drawBoard: (board: Board) =>
    fp.pipe(JSON.stringify(board), console.log, TE.right),

  reportError: (e) => fp.pipe(e, console.error, T.of),

  showEndGameScreen: (player: O.Option<Player>) =>
    fp.pipe(
      player,
      O.matchW(
        () => `No one won`,
        (p) => `${p} won`,
      ),
      console.log,
      TE.right,
    ),
});
