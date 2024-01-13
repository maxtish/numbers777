import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";

export const ButtonGoBack: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Переход на предыдущую страницу
  };
  return (
    <Pressable onPress={() => goBack()} style={styles.closeButton}>
      <Text style={styles.closeText}>Назад</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: "#FF6347",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  closeText: {},
});
