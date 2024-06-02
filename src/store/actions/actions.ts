// actions.ts

import { IWord } from '../reducers/words';

/// numberSpeakReducer
export const allNumberInit = (allNumber: number[]) => ({
  type: 'ALL_NUMBER_INIT' as const,
  allNumber,
});

export const allNumberIncrement = () => ({
  type: 'ALL_NUMBER_INCREMENT' as const,
});

export const allNumbersDecrement = () => ({
  type: 'ALL_NUMBER_DECREMENT' as const,
});
export const allNumbersResetCount = () => ({
  type: 'ALL_NUMBER_RESET_COUNT' as const,
});

export const allNumberInitAndDecrement = (allNumber: number[]) => ({
  type: 'ALL_NUMBER_INIT_AND_DECREMENT' as const,
  allNumber,
});
export const allNumberInitAndLanguage = (language: string) => ({
  type: 'ALL_NUMBER_INIT_LANGUAGE' as const,
  language,
});
///WORDS
export const initWords = (words: IWord[]) => ({
  type: 'INIT_WORDS' as const,
  words,
});

export type ActionTypes = ReturnType<
  | typeof allNumberInit
  | typeof allNumberIncrement
  | typeof allNumbersDecrement
  | typeof allNumbersResetCount
  | typeof allNumberInitAndDecrement
  | typeof allNumberInitAndLanguage
  | typeof initWords
>;
