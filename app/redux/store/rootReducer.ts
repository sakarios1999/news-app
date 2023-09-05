import { combineReducers } from '@reduxjs/toolkit';
import * as Reducers from '../slices';

const rootReducer = combineReducers(Reducers);

export type RootStateType = ReturnType<typeof rootReducer>;

export { rootReducer };
