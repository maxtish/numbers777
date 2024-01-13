// reducers/count.ts
import { ActionTypes } from '../actions/actions';

export interface stateNumberSpeak {
  allNumber: number[];
  count: number;
  language: string;
}

// Начальное состояние
const initialState: stateNumberSpeak = {
  allNumber: [],
  count: 0,
  language: 'de',
};

const numberSpeakReducer = (state: stateNumberSpeak = initialState, action: ActionTypes) => {
  switch (action.type) {
    case 'ALL_NUMBER_INIT_LANGUAGE':
      return { ...state, language: action.language };

    case 'ALL_NUMBER_INIT_AND_DECREMENT':
      if (state.count === 0) {
        return { ...state, allNumber: action.allNumber, count: 0 };
      } else {
        return { ...state, allNumber: action.allNumber, count: state.count - 1 };
      }

    case 'ALL_NUMBER_INIT':
      return { ...state, allNumber: action.allNumber };

    case 'ALL_NUMBER_INCREMENT': {
      if (state.count === state.allNumber.length) {
        console.log('Закончили');
        return { ...state, count: state.count };
      } else {
        return { ...state, count: state.count + 1 };
      }
    }

    case 'ALL_NUMBER_DECREMENT':
      if (state.count === 0) {
        return { ...state, count: 0 };
      } else {
        return { ...state, count: state.count - 1 };
      }

    case 'ALL_NUMBER_RESET_COUNT':
      return { ...state, count: 0 };

    default:
      return state;
  }
};

export default numberSpeakReducer;
