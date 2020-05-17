import React, { Component } from 'react';
import { Animated, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { wait } from '../../utils';


export class Toast extends Component {
  bottom = new Animated.Value(-9999);

  animateIn = () => {
    Animated.timing(this.bottom, {
      toValue: this.props.bottomOffset,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }

  animateOut = () => {
    Animated.timing(this.bottom, {
      toValue: -1000,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }
  
  animateToast = async () => {
    this.animateIn()
    await wait(this.props.visibleDuration);
    this.animateOut();
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.isVisible && this.props.isVisible) {
      this.animateToast();
    } 
  }

  render() {
    const _toastStyle = {
      ...styles.toast,
      ...this.props.toastStyle,
      position: 'absolute',
      bottom: this.bottom,
    };

    const _textStyle = {
      ...styles.text,
      ...this.props.textStyle,
    }

    return (
      <Animated.View style={ _toastStyle }>
        <Text style={ _textStyle }>{ this.props.text }</Text>
      </Animated.View>
    );
  };
};

const styles = {
  toast: {
    alignItems: 'center',
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'relative',
    width: '100%',
  },
}

// Toast.propTypes = {
//   isVisible: PropTypes.string,
//   showDuration: PropTypes.number.isRequired,
//   containerStyles: PropTypes.object,
//   iconLeft: PropTypes.string,
//   iconLeftStyle: PropTypes.,
//   iconRightStyle,
//   iconRight,
//   onIconLeftPress,
//   onIconRightPress,
//   text,
//   textStyles,
// }

// Toast.defaultTypes = {

// }
