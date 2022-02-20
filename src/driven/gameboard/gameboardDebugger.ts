import { function as fp, taskEither as TE, option as O } from 'fp-ts';

import { Gameboard } from '@app/usecase/_adapters/gameboard';
import { Board, Player } from '@app/domain/board';

export const gameboardDebugger = (console: Console): Gameboard => ({
  drawBoard: (board: Board) => fp.pipe(JSON.stringify(board), console.log, TE.right),

  showEndGameScreen: (player: O.Option<Player>) => fp.pipe(
    player,
    O.matchW(
      () => `No one won`,
      p => `${p} won`,
    ),
    console.log,
    TE.right,
  ),
});
