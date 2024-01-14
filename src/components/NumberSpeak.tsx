import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
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

  useEffect(() => {
    if (correctNubmer === undefined) {
      console.log(correctNubmer);
      dispatch(allNumberInit(randomNumberArr()));
      dispatch(allNumbersResetCount());
    }
  }, []);

  const correctNubmer = state.allNumber[state.count];
  const { language } = state;
  const nummberf: string = correctNubmer !== undefined ? correctNubmer.toString() : 'Wird geladen';
  console.log(correctNubmer);
  const [buttonPressed, setButtonPressed] = useState(false); // Add this line

  const speak = useMemo(() => {
    return speakText(
      state.count === state.allNumber.length && state.allNumber[1] !== undefined ? 'Du hast gewonnen' : nummberf,
      (isSpoken) => {
        console.log('Текст произнесен:');
        setButtonPressed(isSpoken);
      },
      language
    );
  }, [nummberf]);

  const handleNumberPress = (number: string) => {
    // Обработка введенной цифры
    console.log(number);
    setEnteredNumbers(number);
  };

  const handleFinishPress = (enteredNumber: string) => {
    // Обработка введенного числа при нажатии "Готово"
    console.log(`Entered number: ${enteredNumber}`);

    if (nummberf === enteredNumber) {
      console.log('ДА');
      playYesSound();
      setYes(true);

      setTimeout(() => {
        //код, который должен выполниться после задержки
        setYes(false);
        dispatch(allNumberIncrement());
      }, 1000);
    } else {
      console.log('НЕТ');
      playNoSound();
      setNo(true);
      setTimeout(() => {
        //код, который должен выполниться после задержки
        dispatch(allNumberInitAndDecrement(randomNumberArr()));
        setNo(false);
      }, 3000);
    }
  };
  const handleStopCountdown = () => {
    // Обработка события "стоп отсчет" здесь
    console.log('Отсчет завершен!');
    handleFinishPress(enteredNumbers);
  };
  return (
    <View style={styles.container}>
      {state.count === state.allNumber.length ? (
        <>
          <Text style={styles.textWin}>
            Sehr gut! Mit den Zahlen haben wir uns jetzt auseinandergesetzt, jetzt bleibt noch, 6000 Wörter für das
            Niveau C1 zu lernen.
          </Text>
          <Pressable
            style={styles.StarthButton}
            onPress={() => {
              dispatch(allNumberInit(randomNumberArr()));
            }}
          >
            <Text>Начать заново</Text>
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
            <ButtonGoBack />
          </View>
          <View style={styles.containerCountdownTimer}>
            <CountdownTimer
              key={`${state.count}${nummberf}`}
              duration={state.count < 5 ? 10 : state.count < 25 ? 15 : state.count < 45 ? 30 : 40}
              onStop={handleStopCountdown}
            ></CountdownTimer>
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
            <CustomNumericKeyboard
              onNumberPress={handleNumberPress}
              onFinishPress={handleFinishPress}
              isTextSpoken={buttonPressed}
            ></CustomNumericKeyboard>
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
  containerCountdownTimer: {},
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
