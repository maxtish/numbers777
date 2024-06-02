// reducers/count.ts
import { ActionTypes } from '../actions/actions';

export interface IWord {
  de: string;
  rus: string;
}

export interface stateWords {
  words: IWord[];
  wordArr: string[];
  count: number;
  totalScore: number;
}

// Начальное состояние
const initialState: stateWords = {
  words: [],
  wordArr: [''],
  count: 0,
  totalScore: 0,
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
