import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useBackHandler } from '@app/services/backHandler';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch } from 'react-redux';
import { allNumberInitAndLanguage } from '../store/actions/actions';
import { useSelector } from 'react-redux';
import { IState } from '../store/store';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useBackHandler();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    { label: 'German', value: 'de' },
    { label: 'English', value: 'en' },
    { label: 'Russian', value: 'ru' },
  ]);

  const handleLanguageChange = (selectedValue: any) => {
    dispatch(allNumberInitAndLanguage(selectedValue));
  };

  const languageTextObj = {
    de: 'German',
    en: 'English',
    ru: 'Russian',
  };

  const { language } = useSelector((state: IState) => state.stateNumberSpeak);

  const languageText = languageTextObj[language];

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select Language:</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={languageText}
            onChangeValue={handleLanguageChange} // добавлен обработчик события
          />
        </View>

        <Pressable style={styles.buttonsNavi} onPress={() => navigate('/numbersScreen')}>
          <Text style={styles.buttonsText}>Start</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    flex: 1,
    gap: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  buttonsNavi: {
    width: '50%',
    backgroundColor: '#20B2AA',
    borderRadius: 5,
    padding: 10,
  },
  buttonsText: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
  },
});

export default HomeScreen;
