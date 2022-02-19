import { function as fp, taskEither as TE } from 'fp-ts';

import { Gameboard } from '@app/usecase/_adapters/gameboard';
import { Board } from '@app/domain/board';

export const gameboardDebugger = (console: Console): Gameboard => ({
  drawBoard: (board: Board) => fp.pipe(JSON.stringify(board), console.log, TE.right),
});
