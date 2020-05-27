import React, { useState } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Colors } from './config';
import {
  Accordion,
  Button,
  Input,
  ExpandableModal,
  PasswordInput,
  UsernameInput,
  Toast,
} from './common';
import { ExampleModalContent } from './components';

const favoriteBlack = require('./assets/icons/favorite-black.png');
const chevronRightBlack = require('./assets/icons/chevronRight-black.png');

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isToastVisible, setToastVisible] = useState(false);
  const [isAccordionExpanded, setAccordionExpanded] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalExpanded, setModalExpanded] = useState(false)

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

  const handleAccordionHeaderPress = () => {
    if (isAccordionExpanded) {
      setAccordionExpanded(false);
    } else {
      setAccordionExpanded(true)
    }
  }

  const handlePasswordChange = val => setPassword(val)
  const handleButtonPress = () => console.log('Button Pressed!');

  const hideModal = () => setModalVisible(false);
  const showModal = () => setModalVisible(true);

  const expandModal = () => setModalExpanded(true);
  const collapseModal = () => setModalExpanded(false);


  return (
    <TouchableWithoutFeedback onPress={ hideModal }>
      <>
        <View style={ styles.screen }>
          <Button
              isFullWidth
              leftIcon={ favoriteBlack }
              onPress={ showModal }
              style={ styles.button }
              title='Open Modal'
              titleStyle={ styles.buttonTitle }
          />
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

            <Toast
              isVisible={ isToastVisible }
              text="Toast Here!"
              visibleDuration={ 3000 }
              bottomOffset={ 100 }
            />
            <Accordion
              isExpanded={ isAccordionExpanded }
              leftIcon={ favoriteBlack }
              onHeaderPress={ handleAccordionHeaderPress }
              rightIcon={ chevronRightBlack }
              title='Title'
            >
              <View style={{ width: '100%', height: 200, backgroundColor: 'red' }}>
                <Text>Children Here</Text>
              </View>
            </Accordion>
        </View>

        <ExpandableModal
          isExpanded={ isModalExpanded }
          isVisible={ isModalVisible }
          onSwipeToHide={ hideModal }
          onSwipeToCollapse={ collapseModal }
          onSwipeToExpand={ expandModal }
          // cancelSwipeAnimationDuration: PropTypes.number, // Milliseconds
          // collapseAnimationDuration: PropTypes.number, // Milliseconds
          // defaultAnimationDuration: PropTypes.number, // Milliseconds
          // expandAnimationDuration: PropTypes.number, // Milliseconds
          // expandedOffset: PropTypes.number, // Expanded Modal offset from top of screen (Float b/n 0 and 1)
          // onCollapseModalComplete: PropTypes.func, // callback
          // onExpandModalComplete: PropTypes.func, // callback
          // onSwipeCancel: PropTypes.func, // hook passing event and gestureState
          // onShowModalComplete: PropTypes.func, // hook passing event and gestureState
          // onSwipeToCollapse: PropTypes.func.isRequired, // set isExpanded to false in parent
          // onSwipeToHide: PropTypes.func.isRequired, // set isVisible to false in parent
          // onHideModalComplete: PropTypes.func.isRequired, // hook passing event 
          // onSwipeToExpand: PropTypes.func.isRequired, // set isExpanded to true in parent
          // showAnimationDuration: PropTypes.number, // Milliseconds for modal to animate in from bottom of the screen
          // swipeThreshold: PropTypes.number, // Threshold distance for swipe to trigger animation
          // visibleOffset: PropTypes.number, // Visible (shown) Modal offset from top of screen (Float b/n 0 and 1)
        >
          <ExampleModalContent />
        </ExpandableModal>
      </>
    </TouchableWithoutFeedback>
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
  modalScrollView: {
    backgroundColor: 'lightblue',
    flex: 1,
  },
  textSection: {
    marginBottom: 100,
  }
}

export default App;
