import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Colors } from './config';
import {
  Button,
  Input,
  PasswordInput,
  EmailInput,
} from './common';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  const onButtonPress = () => console.log('Button Pressed');

  const handleUsernameChange = val => {
    if (val === 'andrewtelkamp') {
      setIsUsernameValid(true);
    } else if (isUsernameValid && val !== 'andrewtelkamp') {
      setIsUsernameValid(false);
    }

    setUsername(val)
  }

  const handlePasswordChange = val => setPassword(val)

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
          <PasswordInput
            backgroundColor={ Colors.BLACK }
            focusedColor={ Colors.PURPLE }
            onValueChange={ handlePasswordChange }
            value={ password }
            textColor={ Colors.WHITE }
          />
        </View>
      </View>
  );
};

const styles = {
  inputWrap: {
    marginBottom: 10,
    width: '100%',
  },
  screen: {
    alignItems: 'center',
    backgroundColor: Colors.BLACK,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
}

export default App;
