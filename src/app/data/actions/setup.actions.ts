import { SetupActionsType } from '../../types/redux.types';

const testKey = '[SetUp]';

export const SetUpActions: SetupActionsType = {
  resetSetup: `${testKey} Reset`,
  setSize: `${testKey} Set Size`,
  setTimeLimit: `${testKey} Set Time Limit`,
};

