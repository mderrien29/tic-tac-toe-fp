import { consoleController } from '@app/driven/controller/consoleController';
import { gameboardDebugger } from '@app/driven/gameboard/gameboardDebugger';
import { playMove } from '@app/usecase/playMove/usecase';
import { gameloop } from '@app/usecase/gameloop/usecase';

gameloop(gameboardDebugger(console), playMove(), consoleController())();
