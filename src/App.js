import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Colors } from './config';
import {
  Button,
  Input,
  PasswordInput,
  EmailInput,
  UsernameInput,
  Toast,
} from './common';

const favoriteBlack = require('./assets/icons/favorite-black.png');
const chevronRightBlack = require('./assets/icons/chevronRight-black.png');

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isToastVisible, setToastVisible] = useState(false);

  const onButtonPress = () => console.log('Button Pressed');

  const showToast = () => {
    setToastVisible(true);
  };

  const handleUsernameChange = val => {
    if (val === 'andrewtelkamp') {
      setIsUsernameValid(true);
    } else if (isUsernameValid && val !== 'andrewtelkamp') {
      setIsUsernameValid(false);
    }

    setUsername(val)
  }

  const handlePasswordChange = val => setPassword(val)
  const handleButtonPress = () => console.log('Button Pressed!');

  return (
      <View style={ styles.screen }>
        <View style={ styles.inputWrap }>
          <Input
            backgroundColor={ Colors.BLACK }
            focusedColor={ Colors.PURPLE }
            label='Label'
            onValueChange={ handleUsernameChange }
            isValidated={ isUsernameValid }
            value={ username }
            validatedColor={ Colors.GREEN }
            textColor={ Colors.WHITE }
          />
        </View>

        <View style={ styles.inputWrap }>
          <UsernameInput
            backgroundColor={ Colors.BLACK }
            focusedColor={ Colors.PURPLE }
            label='Label'
            onValueChange={ handleUsernameChange }
            isValidated={ isUsernameValid }
            value={ username }
            validatedColor={ Colors.GREEN }
            textColor={ Colors.WHITE }
          />
        </View>

        <View style={ styles.inputWrap }>
          <PasswordInput
            backgroundColor={ Colors.BLACK }
            focusedColor={ Colors.PURPLE }
            onValueChange={ handlePasswordChange }
            value={ password }
            textColor={ Colors.WHITE }
          />
        </View>

          <Button
            isFullWidth
            leftIcon={ favoriteBlack }
            onPress={ showToast }
            style={ styles.button }
            title='Button'
            titleStyle={ styles.buttonTitle }
          />

          <Toast
            isVisible={ isToastVisible }
            text="Toast Here!"
            visibleDuration={ 3000 }
            bottomOffset={ 100 }
          />
      </View>
  );
};

const styles = {
  button: {
    backgroundColor: 'blue',
  },
  buttonTitle: {
    fontWeight: '800',
  },
  inputWrap: {
    marginBottom: 10,
    width: '100%',
  },
  wrap: {
    marginBottom: 10,
    width: '100%',
  },
  screen: {
    alignItems: 'center',
    backgroundColor: Colors.BLACK,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  },
}

export default App;
