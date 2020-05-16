import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const StandardButton = ({
  title,
  leftIcon,
  isFullWidth,
  buttonStyle,
  rightIcon,
  titleStyle,
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        buttonStyle,
        isFullWidth && styles.fullWidth,
      ]}
    >
      { !!leftIcon && <LeftIcon />}
      <Text style={ titleStyle }>{ title }</Text>
      { !!rightIcon && <RightIcon />}
    </TouchableOpacity>
  );
}

const styles = {
  button: {
    alignItems: 'center',
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    padding: 10,
  },
  fullWidth: {
    width: '100%',
  },
}