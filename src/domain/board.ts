import {
  array,
  TypeOf,
  type,
  Int,
  union,
  nullType,
  brand,
  Branded,
  literal,
} from 'io-ts';

export const Player = union([literal('X'), literal('O')]);

export const TileState = union([Player, nullType]);

export interface BoardCoordinateBrand {
  readonly BoardCoordinate: unique symbol;
}
export const BoardCoordinate = brand(
  Int,
  (input): input is Branded<Int, BoardCoordinateBrand> =>
    input >= 0 && input < 3,
  'BoardCoordinate',
);
export type BoardCoordinate = TypeOf<typeof BoardCoordinate>;

export const Position = type({ x: BoardCoordinate, y: BoardCoordinate });

export const Tile = type({
  pos: Position,
  state: TileState,
});

export const Board = array(Tile);

export type Player = TypeOf<typeof Player>;
export type TileState = TypeOf<typeof TileState>;
export type Tile = TypeOf<typeof Tile>;
export type Position = TypeOf<typeof Position>;
export type Board = TypeOf<typeof Board>;
