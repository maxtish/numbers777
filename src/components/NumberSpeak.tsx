import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text, Pressable } from 'react-native';
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
export const NumberSpeak: React.FC = () => {
  const state = useSelector((state: IState) => state.stateNumberSpeak);
  const [yes, setYes] = useState<boolean>();
  const [no, setNo] = useState<boolean>();

  const [enteredNumbers, setEnteredNumbers] = useState('');

  const dispatch = useDispatch();

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
      setYes(true);

      setTimeout(() => {
        //код, который должен выполниться после задержки
        setYes(false);
        dispatch(allNumberIncrement());
      }, 1000);
    } else {
      console.log('НЕТ');
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
              <Text style={yes ? styles.resultJa : styles.resultNein}>{nummberf}</Text>
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
