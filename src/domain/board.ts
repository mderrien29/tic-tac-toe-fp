import { function as fp } from 'fp-ts';
import { keyof, array, TypeOf, type, number, union, nullType } from 'io-ts';

export const TileState = union([
  keyof({ X: fp.constNull(), O: fp.constNull() }),
  nullType,
]);

export const Position = type({ x: number, y: number });

export const Tile = type({
  pos: Position,
  state: TileState,
});

export const Board = array(Tile);

export type TileState = TypeOf<typeof TileState>;
export type Tile = TypeOf<typeof Tile>;
export type Position = TypeOf<typeof Position>;
export type Board = TypeOf<typeof Board>;
