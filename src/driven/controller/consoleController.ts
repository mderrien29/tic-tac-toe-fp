import {
  function as fp,
  taskEither as TE,
  task as T,
  either as E,
} from 'fp-ts';
import { Decode, getValidationError, string } from 'io-ts';
import { createInterface } from 'readline';

import { Controller } from '@app/usecase/_adapters/controller';
import { Tile } from '@app/domain/board';

export const consoleController = (): Controller => ({
  getNextMove: () => getValidTileFromUser,
});

const tileFromString: Decode<string, Tile> = (i: string) =>
  fp.pipe(
    i.split(' '),
    E.tryCatchK(
      (a: string[]) => ({
        pos: { x: parseInt(a[0]), y: parseInt(a[1]) },
        state: a[2],
      }),
      (_) => [getValidationError('failed to parse input', [])],
    ),
    E.chain(Tile.decode),
  );

const rl = createInterface(process.stdin, process.stdout);
const questionAsTask = (q: string) => () =>
  new Promise((res) => rl.question(q, res));

const getValidTileFromUser: T.Task<Tile> = fp.pipe(
  questionAsTask('next move ? '),
  T.map((i) => fp.pipe(string.decode(i), E.chain(tileFromString))),
  TE.getOrElse((_) => getValidTileFromUser),
);
