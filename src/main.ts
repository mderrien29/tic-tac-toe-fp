import { consoleController } from '@app/driven/controller/consoleController';
import { gameboardDebugger } from '@app/driven/gameboard/gameboardDebugger';
import { gameboardConsole } from '@app/driven/gameboard/gameboardConsole';
import { playMove } from '@app/usecase/playMove/usecase';
import { gameloop } from '@app/usecase/gameloop/usecase';
import { hasPlayerWon } from './usecase/hasSomeoneWon/usecase';

gameloop(
  gameboardConsole(console),
  playMove(),
  hasPlayerWon(),
  consoleController(),
)().then(() => process.exit(0));
