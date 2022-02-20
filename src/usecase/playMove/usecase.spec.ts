import { function as fp } from 'fp-ts';

import { expectRight, expectLeft } from '../../../test/utils';
import { Board, Tile } from '@app/domain/board';

import { playMove } from './usecase';

describe('playMove', () => {
  describe('empty board', () => {
    let board: Board;

    beforeEach(() => {
      board = [];
    });

    it('should allow valid moves', () => {
      const firstMove: Tile = {
        pos: { x: fp.unsafeCoerce(0), y: fp.unsafeCoerce(0) },
        state: 'X',
      };
      const secondMove: Tile = {
        pos: { x: fp.unsafeCoerce(1), y: fp.unsafeCoerce(1) },
        state: 'O',
      };
      const res = playMove()(board, firstMove);

      expectRight(res);
      expect(res.right).toMatchObject([firstMove]);

      const res2 = playMove()(res.right, secondMove);
      expectRight(res2);
      expect(res2.right).toMatchObject([firstMove, secondMove]);
    });

    it('should not allow the same move twice', () => {
      const firstMove: Tile = {
        pos: { x: fp.unsafeCoerce(0), y: fp.unsafeCoerce(0) },
        state: 'X',
      };
      const boardAfterMove = playMove()(board, firstMove);
      expectRight(boardAfterMove);

      const res = playMove()(boardAfterMove.right, firstMove);

      expectLeft(res);
    });

    it('should not allow the same player to play twice in a row', () => {
      const firstMove: Tile = {
        pos: { x: fp.unsafeCoerce(0), y: fp.unsafeCoerce(0) },
        state: 'X',
      };
      const secondMove: Tile = {
        pos: { x: fp.unsafeCoerce(1), y: fp.unsafeCoerce(1) },
        state: 'X',
      };
      const boardAfterMove = playMove()(board, firstMove);
      expectRight(boardAfterMove);

      const res = playMove()(boardAfterMove.right, secondMove);

      expectLeft(res);
    });
  });
});
