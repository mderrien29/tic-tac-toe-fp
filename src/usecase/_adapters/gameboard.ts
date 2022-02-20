import { taskEither as TE, option as O } from 'fp-ts';

import { Board, Player } from '@app/domain/board';
import { UnclassifiedError } from '@app/domain/error';

export interface Gameboard {
  drawBoard(b: Board): TE.TaskEither<UnclassifiedError, void>;
  showEndGameScreen(
    res: O.Option<Player>,
  ): TE.TaskEither<UnclassifiedError, void>;
}
