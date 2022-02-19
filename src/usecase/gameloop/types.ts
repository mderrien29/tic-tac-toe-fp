import { Board } from '@app/domain/board';
import { Pure as PlayMove } from '@app/usecase/playMove/types';
import {Gameboard} from '../_adapters/gameboard';
import {Controller} from '../_adapters/controller';

export type Pure = () => Promise<Board>;

export type Usecase = (
  gameboard: Gameboard,
  playMove: PlayMove,
  controller: Controller,
) => Pure;
