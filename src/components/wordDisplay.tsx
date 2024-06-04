import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../store/store';
import { initWords } from '../store/actions/actions';
import { IWord } from '../store/reducers/words';

export const WordDisplay: React.FC<{ word: IWord }> = ({ word }) => {
  const [text, setText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Индекс текущей буквы

  // Инициализация массива хуков useSharedValue на верхнем уровне
  const rotations = word.de.split('').map(() => useSharedValue(0));

  const flipCard = (index: number) => {
    const rotate = rotations[index];
    rotate.value = withTiming(rotate.value === 0 ? 180 : 0, { duration: 300 });
  };

  const handleTextChange = (inputText: string) => {
    const currentLetter = word.de[currentIndex];
    const inputLetter = inputText[inputText.length - 1];

    if (inputLetter === currentLetter) {
      flipCard(currentIndex);
      setCurrentIndex(currentIndex + 1);
      setText(inputText);
    } else {
      console.log('Ошибка: Неправильная буква');
    }
  };

  return (
    <View style={styles.wordContainer}>
      <Text style={styles.translation}>{word.rus}</Text>

      <View style={styles.lettersContainer}>
        {word.de.split('').map((letter, index) => {
          const rotate = rotations[index];
          const frontAnimatedStyle = useAnimatedStyle(() => ({
            transform: [
              {
                rotateY: `${rotate.value}deg`,
              },
            ],
            backfaceVisibility: 'hidden',
          }));

          const backAnimatedStyle = useAnimatedStyle(() => ({
            transform: [
              {
                rotateY: `${rotate.value + 180}deg`,
              },
            ],
            backfaceVisibility: 'hidden',
          }));

          return (
            <TouchableOpacity key={index} onPress={() => flipCard(index)}>
              <View style={styles.flipContainer}>
                <Animated.View style={[styles.hiddenLetter, frontAnimatedStyle]}>
                  <Text style={styles.letter}> </Text>
                </Animated.View>
                <Animated.View style={[styles.visibleLetter, backAnimatedStyle]}>
                  <Text style={styles.letter}>{letter}</Text>
                </Animated.View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View>
        <Text>TextInput</Text>
        <TextInput style={styles.input} onChangeText={handleTextChange} value={text} placeholder="Введите что-нибудь" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wordContainer: {
    alignItems: 'center',
  },
  translation: {
    fontSize: 24,
    marginBottom: 20,
  },
  lettersContainer: {
    flexDirection: 'row',
  },
  flipContainer: {
    width: 50,
    height: 50,
    margin: 5,
    position: 'relative',
  },
  hiddenLetter: {
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  visibleLetter: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  letter: {
    fontSize: 30,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  output: {
    fontSize: 18,
  },
});
