import React from 'react';
import { useBackHandler } from '@app/services/backHandler';
import { NumberSpeak } from '../components/NumberSpeak';

const NumberSpeakScreen: React.ComponentType = () => {
  useBackHandler();
  return <NumberSpeak />;
};

export default NumberSpeakScreen;
