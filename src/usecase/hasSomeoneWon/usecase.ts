import { function as fp, option as O } from 'fp-ts';

import { Player, Tile } from '@app/domain/board';

import { Usecase } from './types';

export const hasPlayerWon: Usecase = () => (board) =>
  fp.pipe(
    [
      [0, 1, 2].map((line) =>
        allBelongToSamePlayer(
          board
            .filter((tile) => !!tile.state)
            .filter((tile) => tile.pos.x === line),
        ),
      ),
      [0, 1, 2].map((col) =>
        allBelongToSamePlayer(
          board
            .filter((tile) => !!tile.state)
            .filter((tile) => tile.pos.y === col),
        ),
      ),
      allBelongToSamePlayer(
        [0, 1, 2]
          .map((diag) =>
            board
              .filter((tile) => !!tile.state)
              .filter((tile) => tile.pos.y === diag && tile.pos.x === diag),
          )
          .flat(),
      ),
      allBelongToSamePlayer(
        [0, 1, 2]
          .map((diag2) =>
            board
              .filter((tile) => !!tile.state)
              .filter(
                (tile) => tile.pos.y === diag2 && tile.pos.x === 2 - diag2,
              ),
          )
          .flat(),
      ),
    ]
      .flat()
      .find((v) => O.isSome(v)),
    O.fromNullable,
    O.flatten,
  );

const allBelongToSamePlayer = (tileComb: Tile[]): O.Option<Player> =>
  tileComb.length >= 3 &&
  tileComb[0].state !== null &&
  tileComb.every((t) => t.state === tileComb[0].state)
    ? O.some(tileComb[0].state)
    : O.none;
