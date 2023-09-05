import { store, persistor } from './store/store';
import { RootStateType } from './store/rootReducer';

export type RootState = RootStateType;

export { store, persistor };
