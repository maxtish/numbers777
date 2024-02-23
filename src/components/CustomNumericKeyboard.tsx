import React, { useState, FC, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Vibration } from 'react-native';
import { IState } from '../store/store';
import { useSelector } from 'react-redux';

interface CustomNumericKeyboardProps {
  onNumberPress?: (number: string) => void;
  onNumberChange?: (enteredNumber: string) => void;
}

export const CustomNumericKeyboard: FC<CustomNumericKeyboardProps> = ({ onNumberPress }) => {
  const [enteredNumber, setEnteredNumber] = useState('');

  const handleNumberPress = (number: string) => {
    Vibration.vibrate([0, 20]); //  (пауза после клика, время вибраци, )
    setEnteredNumber(enteredNumber + number);
    onNumberPress && onNumberPress(enteredNumber + number);
  };

  const state = useSelector((state: IState) => state.stateNumberSpeak);

  useEffect(() => {
    setEnteredNumber('');
  }, [state.count]);

  const handleNumberDel = () => {
    Vibration.vibrate([0, 20]);
    const stringWithoutLastCharacter = enteredNumber.slice(0, -1);
    setEnteredNumber(stringWithoutLastCharacter);
    onNumberPress && onNumberPress(stringWithoutLastCharacter);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerNumber}>
        <Text style={styles.textNumber}>{enteredNumber}</Text>
        <Pressable
          onPress={() => {
            handleNumberDel();
          }}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonTextDel}> &lt;-- </Text>
        </Pressable>
      </View>
      <View style={styles.containerKeyboard}>
        <View>
          <View style={styles.row}>
            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={() => handleNumberPress('1')}
            >
              <Text style={styles.buttonText}>1</Text>
            </Pressable>
            <Pressable
              onPress={() => handleNumberPress('2')}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            >
              <Text style={styles.buttonText}>2</Text>
            </Pressable>
            <Pressable
              onPress={() => handleNumberPress('3')}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            >
              <Text style={styles.buttonText}>3</Text>
            </Pressable>
          </View>
          <View style={styles.row}>
            <Pressable
              onPress={() => handleNumberPress('4')}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            >
              <Text style={styles.buttonText}>4</Text>
            </Pressable>
            <Pressable
              onPress={() => handleNumberPress('5')}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            >
              <Text style={styles.buttonText}>5</Text>
            </Pressable>
            <Pressable
              onPress={() => handleNumberPress('6')}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            >
              <Text style={styles.buttonText}>6</Text>
            </Pressable>
          </View>
          <View style={styles.row}>
            <Pressable
              onPress={() => handleNumberPress('7')}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            >
              <Text style={styles.buttonText}>7</Text>
            </Pressable>
            <Pressable
              onPress={() => handleNumberPress('8')}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            >
              <Text style={styles.buttonText}>8</Text>
            </Pressable>
            <Pressable
              onPress={() => handleNumberPress('9')}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            >
              <Text style={styles.buttonText}>9</Text>
            </Pressable>
          </View>
          <View style={styles.row}>
            <Pressable
              onPress={() => handleNumberPress('0')}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            >
              <Text style={styles.buttonText}>0</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerKeyboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerNumber: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
  },
  textNumber: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#CCCCCC',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 50,
  },
  row: {
    flexDirection: 'row',
    marginBottom: '1%',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    margin: '2%',
    borderRadius: 5,
  },
  buttonPressed: {
    backgroundColor: '#CCC',
  },
  finishButton: {
    backgroundColor: '#2ecc71',
    margin: '5%',
    borderRadius: 5,
  },
  finishButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 22,
    padding: '2%',
  },
  buttonTextDel: {
    color: '#ffffff',
    fontSize: 22,
    padding: '2%',
  },
});
