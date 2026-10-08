import { SetupActionsType } from '../../types/redux.types';
import { createAction, props } from '@ngrx/store';
import { MazeSize } from '../../types/maze.types';
import { TimeLimit } from '../../types/data.types';

const testKey = '[SetUp]';

export const ActionKeys: SetupActionsType = {
  resetSetup: `${testKey} Reset`,
  setSize: `${testKey} Set Size`,
  setTimeLimit: `${testKey} Set Time Limit`,
};

export const resetSetup = createAction(ActionKeys.resetSetup);
export const setSize = createAction(ActionKeys.setSize,props<{size: MazeSize}>());
export const setTimeLimit = createAction(ActionKeys.setTimeLimit,props<{timeLimit: TimeLimit}>());
