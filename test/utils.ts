import { ok } from 'assert';

import {
  either as E,
  function as fp,
  option as O,
  readonlyArray as A,
  task as T,
  taskEither as TE,
} from 'fp-ts';

export const apply: (
  tasks: TE.TaskEither<any, any>[],
) => Promise<readonly any[]> = (tasks) =>
  fp
    .pipe(tasks, T.traverseArray(fp.identity), T.map(A.separate))()
    .then(({ left, right }) =>
      A.isNonEmpty(left) ? Promise.reject(left) : Promise.resolve(right),
    );

export const expectRight: <L, R>(
  e: E.Either<L, R>,
  m?: string,
) => asserts e is E.Right<R> = (e, m) => {
  if (E.isLeft(e)) {
    console.log('expected right, got left: ', e.left);
  }
  return ok(E.isRight(e), m);
};

export const expectLeft: <L, R>(
  e: E.Either<L, R>,
  m?: string,
) => asserts e is E.Left<L> = (e, m) => {
  if (E.isRight(e)) {
    console.log('expected left, got right: ', e.right);
  }
  return ok(E.isLeft(e), m);
};

export const expectSome: <T>(
  o: O.Option<T>,
  m?: string,
) => asserts o is O.Some<T> = (o, m) => ok(O.isSome(o), m);

export const expectNone: <T>(
  o: O.Option<T>,
  m?: string,
) => asserts o is O.None = (o, m) => ok(O.isNone(o), m);

export const wait = (ms = 100): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
