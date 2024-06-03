import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../store/store';
import { initWords } from '../store/actions/actions';
import { IWord } from '../store/reducers/words';
import { WordDisplay } from './wordDisplay';

export const Words: React.FC = () => {
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

  useEffect(() => {
    dispatch(initWords(a1WordWZ));
  }, []);

  const stateWords = useSelector((state: IState) => state.stateWords);
  const dispatch = useDispatch();

  const currentWord: IWord | undefined = stateWords.words[stateWords.count];

  if (currentWord) {
    return (
      <View style={styles.container}>
        <WordDisplay word={currentWord} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Нет данных</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
