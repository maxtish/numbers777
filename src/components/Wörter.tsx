import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export const Wörter: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlipCard letter="R" />
      <FlipCard letter="R" />
      <FlipCard letter="R" />
    </View>
  );
};

const FlipCard: React.FC<{ letter: string }> = ({ letter }) => {
  const [flipped, setFlipped] = useState(false);
  const rotate = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${rotate.value}deg`,
        },
      ],
      backfaceVisibility: 'hidden',
    };
  }, [rotate]);

  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${rotate.value + 180}deg`,
        },
      ],
      backfaceVisibility: 'hidden',
    };
  }, [rotate]);

  const flipCard = () => {
    if (flipped) {
      rotate.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      rotate.value = withTiming(180, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      });
    }
    setFlipped(!flipped);
  };

  return (
    <TouchableOpacity onPress={flipCard}>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#B5B8B1',
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
