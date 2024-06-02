// reducers/count.ts
import { ActionTypes } from '../actions/actions';

export interface stateWords {
  words: string[];
  wordArr: string[];
  count: number;
}

// Начальное состояние
const initialState: stateWords = {
  words: [''],
  wordArr: [''],
  count: 0,
};

const wordsReducer = (state: stateWords = initialState, action: ActionTypes) => {
  switch (action.type) {
    case 'INIT_WORDS':
      return { ...state, words: action.words };

    default:
      return state;
  }
};

export default wordsReducer;
