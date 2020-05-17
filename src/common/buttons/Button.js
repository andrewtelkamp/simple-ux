import React, { memo } from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import { Colors } from '../../config';

export const Button = memo(({
  buttonColor = 'lightgray',
  borderColor,
  borderWidth = 3,
  borderRadius = 5,
  padding = 10,
  paddingVertical,
  paddingHorizontal,
  iconSize = 24,
  isFullWidth = false,
  leftIcon,
  onPress,
  rightIcon,
  title,
  titleSize = 16,
  titleWeight = '700',
  titleColor = Colors.BLACK,
}) => {

  const titleStyle = {
    color: titleColor,
    fontSize: titleSize,
    fontWeight: titleWeight,
    padding,
  }

  const iconStyle = {
    height: iconSize,
    width: iconSize,
  }

  const iconLeftStyle = {
    paddingRight: padding,
  }

  const iconRightStyle = {
    paddingLeft: padding,
  }



  const buttonStyle = {
    alignItems: 'center',
    borderRadius,
    borderWidth,
    borderColor,
    backgroundColor: buttonColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: isFullWidth ? '100%' : undefined,
  }

  if (paddingVertical || paddingHorizontal) {
    buttonStyle.paddingVertical = paddingVertical;
    buttonStyle.paddingHorizontal = paddingHorizontal;
  } else {
    buttonStyle.padding = padding;
  }

  if (isFullWidth) {
    buttonStyle.width = '100%';
  }



  return (
    <TouchableOpacity onPress={ onPress } style={ buttonStyle }>
      <View>
        { !!leftIcon && (
          <Image source={ leftIcon } style={[ iconStyle, iconLeftStyle ]} />
        )}
      </View>

      <Text style={ titleStyle }>{ title }</Text>

      <View>
        { !!rightIcon && (
          <Image source={ rightIcon } style={[ iconStyle, iconRightStyle ]} />
        )}
      </View>
    </TouchableOpacity>
  );
});
