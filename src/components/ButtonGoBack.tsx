import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';

interface IButtonGoBack {
  text: string;
}
export const ButtonGoBack: React.FC<IButtonGoBack> = ({ text }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Переход на предыдущую страницу
  };
  return (
    <Pressable onPress={() => goBack()} style={styles.closeButton}>
      <Text style={styles.closeText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  closeText: {},
});
