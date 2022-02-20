import { option as O } from 'fp-ts';

import { Board, Player } from '@app/domain/board';

export type Pure = (board: Board) => O.Option<Player>;

export type Usecase = () => Pure;
