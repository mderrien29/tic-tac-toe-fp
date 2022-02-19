import { expectRight, expectLeft } from '../../../test/utils';
import { Board, Tile } from '@app/domain/board';

import { playMove } from './usecase';

describe('playMove', () => {
  describe('empty board', () => {
    const board: Board = [];

    it('should allow first move', () => {
      const firstMove: Tile = { pos: { x: 0, y: 0 }, state: 'X' };
      const res = playMove()(board, firstMove);

      expectRight(res);
      expect(res.right).toMatchObject([firstMove]);
    });

    it('should not allow the same move twice', () => {
      const firstMove: Tile = { pos: { x: 0, y: 0 }, state: 'X' };
      const boardAfterMove = playMove()(board, firstMove);
      expectRight(boardAfterMove);

      const res = playMove()(boardAfterMove.right, firstMove);

      expectLeft(res)
    });

  })
})
