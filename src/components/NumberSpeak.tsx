import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text, Pressable, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  allNumberIncrement,
  allNumberInit,
  allNumberInitAndDecrement,
  allNumbersResetCount,
} from '../store/actions/actions';
import { randomNumberArr } from '@app/services/randomNumberArr';
import { IState } from '../store/store';
import { CustomNumericKeyboard } from './CustomNumericKeyboard';
import { speakText } from '@app/services/speakText';
import * as Progress from 'react-native-progress';
import { CountdownTimer } from './CountdownTimer';
import { ButtonGoBack } from './ButtonGoBack';
import No from '@app/assets/no.png';
import Yes from '@app/assets/yes.png';
import ReplayAudio from '@app/assets/replay-audio.png';
import { Audio } from 'expo-av';

export const NumberSpeak: React.FC = () => {
  const state = useSelector((state: IState) => state.stateNumberSpeak);
  const [yes, setYes] = useState<boolean>();
  const [no, setNo] = useState<boolean>();
  const [enteredNumbers, setEnteredNumbers] = useState('');
  const dispatch = useDispatch();

  // Типизация для переменных yesSound и noSound
  const [yesSound, setYesSound] = useState<Audio.Sound | undefined>(undefined);
  const [noSound, setNoSound] = useState<Audio.Sound | undefined>(undefined);

  useEffect(() => {
    // Загрузка звуковых файлов при монтировании компонента
    async function loadSounds() {
      try {
        const yesMp3: Audio.Sound = new Audio.Sound();
        const noMp3: Audio.Sound = new Audio.Sound();

        await yesMp3.loadAsync(require('@app/assets/mp3/yes.mp3'));
        await noMp3.loadAsync(require('@app/assets/mp3/no.mp3'));

        setYesSound(yesMp3);
        setNoSound(noMp3);
      } catch (error) {
        console.error('Ошибка при загрузке звуковых файлов', error);
      }
    }

    loadSounds();
    return () => {
      // Выгрузка звуковых файлов при размонтировании компонента
      if (yesSound) {
        yesSound.unloadAsync();
      }
      if (noSound) {
        noSound.unloadAsync();
      }
    };
  }, []);

  const playYesSound = async () => {
    // Воспроизведение звука "Да"
    try {
      if (yesSound) {
        await yesSound.replayAsync();
      }
    } catch (error) {
      console.error('Ошибка воспроизведения звука "Да"', error);
    }
  };

  const playNoSound = async () => {
    // Воспроизведение звука "Нет"
    try {
      if (noSound) {
        await noSound.replayAsync();
        await noSound.setVolumeAsync(0.3);
      }
    } catch (error) {
      console.error('Ошибка воспроизведения звука "Нет"', error);
    }
  };

  ///эта проверка уже есть в HomeScreen
  useEffect(() => {
    if (correctNubmer === undefined) {
      console.log(correctNubmer);
      dispatch(allNumberInit(randomNumberArr()));
      dispatch(allNumbersResetCount());
    }
  }, []);

  const textObj = {
    finish: {
      ru: 'Отличная работа! Вы идеально освоили числа. Теперь важно сохранять мотивацию и продолжать учить новые слова!',
      de: 'Sehr gut! Mit den Zahlen haben wir uns jetzt auseinandergesetzt. Jetzt bleibt nur noch, motiviert zu bleiben und weiterhin neue Wörter zu lernen!',
      en: `Great job! You've mastered the numbers perfectly. Now, all that's left is to stay motivated and keep learning new words!`,
      ja: '「素晴らしい仕事ですね！数字を完璧にマスターしました。今後はモチベーションを維持し、新しい単語を学び続けることが重要です！',
    },
    buttonReset: { ru: 'Начать заново', de: 'Von vorne anfangen', en: 'Start over', ja: '最初から始める' },
    loading: { ru: 'Загрузка', de: 'Wird geladen', en: 'Loading', ja: 'ダウンロード' },
    victory: { ru: 'Ты выиграл', de: 'Du hast gewonnen', en: 'You won', ja: 'あなたが勝ちました' },
    goBack: { ru: 'назад', de: 'zurück', en: 'back', ja: '戻るボタン' },
  };

  const correctNubmer = state.allNumber[state.count];
  const { language } = state;
  const loadingText = textObj.loading[language];
  const victoryText = textObj.victory[language];
  const goBackText = textObj.goBack[language];
  const nummberf: string = correctNubmer !== undefined ? correctNubmer.toString() : loadingText;
  console.log(correctNubmer);

  const speak = useMemo(() => {
    return speakText(
      state.count === state.allNumber.length && state.allNumber[1] !== undefined ? victoryText : nummberf,
      (isSpoken) => {
        console.log('Текст произнесен:');
      },
      language
    );
  }, [nummberf]);

  const handleNumberPress = (number: string) => {
    // Обработка введенной цифры
    console.log(number);
    setEnteredNumbers(number);
    if (nummberf === number) {
      console.log('ДА');
      playYesSound();
      setYes(true);
      setTimeout(() => {
        //код, который должен выполниться после задержки
        setEnteredNumbers('');
        setYes(false);
        dispatch(allNumberIncrement());
      }, 1000);
    } else {
    }
  };

  const handleStopCountdown = () => {
    // Обработка события "стоп отсчет" здесь
    console.log('Отсчет завершен!');
    console.log('НЕТ');
    playNoSound();
    setNo(true);
    setTimeout(() => {
      //код, который должен выполниться после задержки
      dispatch(allNumberInitAndDecrement(randomNumberArr()));
      setNo(false);
    }, 3000);
  };

  const finishText = textObj.finish[language];
  const resetButtonText = textObj.buttonReset[language];
  return (
    <View style={styles.container}>
      {state.count === state.allNumber.length ? (
        <>
          <Text style={styles.textWin}>{finishText}</Text>
          <Pressable
            style={styles.StarthButton}
            onPress={() => {
              dispatch(allNumberInit(randomNumberArr()));
            }}
          >
            <Text>{resetButtonText}</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View style={styles.header}>
            <Progress.Bar
              style={styles.progress}
              progress={(state.count + 1) / state.allNumber.length}
              width={200}
              height={20}
              borderRadius={50}
            />
            <ButtonGoBack text={goBackText} />
          </View>
          <View style={styles.containerCountdownTimer}>
            <CountdownTimer
              key={`${state.count}${nummberf}`}
              duration={state.count < 5 ? 10 : state.count < 25 ? 15 : state.count < 45 ? 30 : 40}
              onStop={handleStopCountdown}
            ></CountdownTimer>
            <TouchableOpacity
              onPress={() =>
                speakText(
                  state.count === state.allNumber.length && state.allNumber[1] !== undefined ? victoryText : nummberf,
                  (isSpoken) => {
                    console.log('Текст произнесен:');
                  },
                  language
                )
              }
            >
              <Image style={styles.imageReplayAudio} source={ReplayAudio}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.containerCorrectNubmer}>
            {yes || no ? (
              <>
                <Text style={yes ? styles.resultJa : styles.resultNein}>
                  {yes ? <Image style={styles.image} source={Yes} /> : <Image style={styles.image} source={No} />}{' '}
                  {nummberf}
                </Text>
              </>
            ) : (
              <Text style={styles.resultJa}> </Text>
            )}
          </View>

          <View style={styles.containerKeyboard}>
            <CustomNumericKeyboard onNumberPress={handleNumberPress}></CustomNumericKeyboard>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  imageReplayAudio: {
    width: 90,
    height: 90,
  },
  StarthButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    margin: 5,
    borderRadius: 5,
  },
  textWin: {
    padding: 20,
    color: '#2ecc71',
    fontSize: 20,
  },
  containerCorrectNubmer: {},
  containerKeyboard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCountdownTimer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progress: {
    marginVertical: 20,
  },
  resultJa: {
    color: '#2ecc71',
    fontSize: 50,
    fontWeight: '900',
  },
  resultNein: {
    color: 'red',
    fontSize: 50,
    fontWeight: '900',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonsNavi: {
    width: '50%',
    backgroundColor: '#20B2AA',
    borderRadius: 5,
  },
});
