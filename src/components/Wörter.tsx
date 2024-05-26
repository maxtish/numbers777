import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface IWord {
  de: string;
  rus: string;
}

const a1WordWZ: IWord[] = [
  { de: 'wann', rus: 'когда' },
  { de: 'warten', rus: 'ждать' },
  { de: 'warum', rus: 'почему' },
  { de: 'was', rus: 'что' },
  { de: 'das Wasser', rus: 'вода' },
  { de: 'weiblich', rus: 'женский' },
  { de: 'der Wein', rus: 'вино' },
  { de: 'weit', rus: 'далеко' },
  { de: 'weiter', rus: 'дальше' },
  { de: 'welch-', rus: 'какой' },
  { de: 'die Welt', rus: 'мир' },
  { de: 'wenig', rus: 'мало' },
  { de: 'wer', rus: 'кто' },
  { de: 'werden', rus: 'стать, становиться' },
];

const WordDisplay: React.FC<{ word: IWord }> = ({ word }) => {
  const rotateValues = word.de.split('').map(() => useSharedValue(0));
  const [flipped, setFlipped] = useState<boolean[]>(new Array(word.de.length).fill(false));

  const flipCard = (index: number) => {
    const rotate = rotateValues[index];
    const isFlipped = flipped[index];

    rotate.value = withTiming(isFlipped ? 0 : 180, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });

    setFlipped(flipped.map((flip, i) => (i === index ? !flip : flip)));
  };

  return (
    <View style={styles.wordContainer}>
      <Text style={styles.translation}>{word.rus}</Text>
      <View style={styles.lettersContainer}>
        {word.de.split('').map((letter, index) => {
          const rotate = rotateValues[index];
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
    </View>
  );
};

export const Wörter: React.FC = () => {
  const [currentWord] = useState<IWord>(a1WordWZ[0]);

  return (
    <View style={styles.container}>
      <WordDisplay word={currentWord} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
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
});
