import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigate } from 'react-router-native';

//Реакция на нажитие назад в моб.приложении
export const useBackHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackPress = () => {
      navigate(-1);
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);
};
