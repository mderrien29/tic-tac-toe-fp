import { taskEither as TE } from 'fp-ts';

import { Board } from "@app/domain/board";
import { UnclassifiedError } from '@app/domain/error';

export interface Gameboard {
  drawBoard(b: Board): TE.TaskEither<UnclassifiedError, void>;
}
