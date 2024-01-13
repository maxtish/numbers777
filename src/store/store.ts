// store.ts

import { createStore, combineReducers } from 'redux';
import numberSpeakReducer, { stateNumberSpeak } from './reducers/numberSpeak';

// Создаём корневой редюсер
const rootReducer = combineReducers({
  stateNumberSpeak: numberSpeakReducer,
});

export interface IState {
  stateNumberSpeak: stateNumberSpeak;
}

const store = createStore(rootReducer);

export { store };
