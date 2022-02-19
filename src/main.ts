import { function as fp, taskEither as TE, task as T } from 'fp-ts';

import { consoleController } from '@app/driven/controller/consoleController';
import { gameboardDebugger  } from '@app/driven/gameboard/gameboardDebugger';
import { playMove } from '@app/usecase/playMove/usecase';
import { Board } from '@app/domain/board';

const initialBoard: Board = [];
fp.pipe(
  TE.right(initialBoard),
  TE.chainFirst(gameboardDebugger(console).drawBoard),
  TE.chainW(board => fp.pipe(
      consoleController().getNextMove(),
      T.map(move => playMove()(board, move)),
    ),
  ),
  TE.chainFirstW(gameboardDebugger(console).drawBoard),
)();
