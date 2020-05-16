import React, { useState } from 'react';
import {
  Animated,
  Image,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../config';

const shouldAnimate = new Animated.Value(0);

export const Input = ({
  borderRadius,
  backgroundColor = Colors.WHITE,
  borderColor = Colors.LIGHT_GRAY,
  borderWidth = 1,
  fontSize = 16,
  fontWeight = '500',
  fontFamily,
  focusedBorderWidth = 2,
  focusedColor,
  focusedLabelFontWeight = '700',
  isValidated = false,
  labelColor = Colors.LIGHT_GRAY,
  icon,
  iconSize,
  label,
  onIconPress,
  // labelColor
  textColor = Colors.BLACK,
  value,
  onValueChange,
  placeholderColor = Colors.LIGHT_GRAY,
  validatedBorderWidth = 2,
  validatedColor,
  validatedLabelFontWeight = '700',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = () => {
    setIsFocused(true);
    animateLabelTo(1)
  }

  const handleBlur = () => {
    setIsFocused(false);
    
    if (!value) {
      animateLabelTo(0)
    }
  };

  const animateLabelTo = value => {
    Animated.timing(shouldAnimate, {
      toValue: value,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }

  const labelPadding = fontSize * 0.2;
  const threeFourthsFontSize = fontSize * 0.75;
  const labelAfterTop = 0 - ((borderWidth / 2) + (threeFourthsFontSize / 2));

  // interpolating style values
  const interpolLabelSize = shouldAnimate.interpolate({
    inputRange: [0, 1],
    outputRange: [fontSize, threeFourthsFontSize],
  })
  const interpolLabelTop = shouldAnimate.interpolate({
    inputRange: [0, 1],
    outputRange: [threeFourthsFontSize, labelAfterTop],
  });

  // label styling
  let containerStyle = {
    borderColor,
    borderRadius,
    borderWidth,
    width: '100%',
  };

  const iconStyle = {
    height: iconSize || fontSize * 1.5,
    width: iconSize || fontSize * 1.5,
  }

  const iconWrapStyle = {
    alignItems: 'center',
    backgroundColor,
    height: fontSize + (threeFourthsFontSize * 2),
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    width: fontSize + (threeFourthsFontSize * 2),
  }

  let inputStyle = {
    color: textColor,
    flexDirection: 'row',
    padding: threeFourthsFontSize,
    fontWeight,
    fontSize,
    width: '100%',
  };

  let labelStyle = {
    backgroundColor,
    color: placeholderColor,
    fontSize: interpolLabelSize,
    fontFamily,
    paddingHorizontal: labelPadding,
    position: 'absolute',
    left: fontSize - labelPadding,
    top: interpolLabelTop,
  };

  if (isFocused) {
    labelStyle = {
      ...labelStyle,
      color: focusedColor,
      fontWeight: focusedLabelFontWeight,
    };
    containerStyle = {
      ...containerStyle,
      borderColor: focusedColor,
      borderWidth: focusedBorderWidth,
    };
  }

  if (isValidated) {
    labelStyle = {
      ...labelStyle,
      color: validatedColor,
      fontWeight: validatedLabelFontWeight,
    };
    containerStyle = {
      ...containerStyle,
      borderColor: validatedColor,
      borderWidth: validatedBorderWidth,
    };
  }

  return (
    <View style={ containerStyle }>
      <Animated.Text style={ labelStyle }>{ label }</Animated.Text>
      <TextInput
        value={ value }
        onBlur={ handleBlur }
        onChangeText={ onValueChange }
        onFocus={ handleFocus }
        style={ inputStyle }
        { ...props }
      />
      { !!icon && (
        <TouchableOpacity
          onPress={ onIconPress }
          style={ iconWrapStyle }
        >
          <Image
            style={ iconStyle }
            source={ icon }
          />
        </TouchableOpacity>
      )}
    </View>
  )
}
