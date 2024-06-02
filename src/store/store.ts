// store.ts

import { createStore, combineReducers } from 'redux';
import numberSpeakReducer, { stateNumberSpeak } from './reducers/numberSpeak';
import wordsReducer, { stateWords } from './reducers/words';

// Создаём корневой редюсер
const rootReducer = combineReducers({
  stateNumberSpeak: numberSpeakReducer,
  stateWords: wordsReducer,
});

export interface IState {
  stateNumberSpeak: stateNumberSpeak;
  stateWords: stateWords;
}

const store = createStore(rootReducer);

export { store };
