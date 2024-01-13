import * as Speech from 'expo-speech';

type SpeakCallback = (isSpoken: boolean) => void;

export const speakText = async (text: string, callback: SpeakCallback, language: string): Promise<void> => {
  try {
    await Speech.speak(text, {
      language: language, //
      onDone: () => {
        callback(true); // вызывается, когда произношение завершено успешно
      },
      onStart: () => {
        callback(false); // вызывается, когда начал произношение
      },
    });
  } catch (error) {
    console.error('Ошибка при произнесении:', error);
    callback(false);
  }
};
