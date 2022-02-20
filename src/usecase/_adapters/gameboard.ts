import { taskEither as TE, task as T, option as O } from 'fp-ts';

import { Board, Player } from '@app/domain/board';
import { UnclassifiedError, AnyError } from '@app/domain/error';

export interface Gameboard {
  drawBoard(b: Board): TE.TaskEither<UnclassifiedError, void>;
  reportError(e: AnyError): T.Task<void>;
  showEndGameScreen(
    res: O.Option<Player>,
  ): TE.TaskEither<UnclassifiedError, void>;
}
