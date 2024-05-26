import React from 'react';
import { useBackHandler } from '@app/services/backHandler';
import { Wörter } from '../components/Wörter';

const WörterScreen: React.ComponentType = () => {
  useBackHandler();
  return <Wörter />;
};

export default WörterScreen;
