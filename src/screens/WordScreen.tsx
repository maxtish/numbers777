import React from 'react';
import { useBackHandler } from '@app/services/backHandler';
import { Words } from '../components/Words';

const WordScreen: React.ComponentType = () => {
  useBackHandler();
  return <Words />;
};

export default WordScreen;
