
import React, { useState } from 'react';
import { Input } from './Input';

const visibility = require('../../assets/icons/visibility-white.png');
const visibilityOff = require('../../assets/icons/visibilityOff-white.png');

export const PasswordInput = props => {
  const [isVisible, setIsVisible] = useState(false);

  toggleIsVisible = () => setIsVisible(!isVisible);

  return (
    <Input
      label={ props.label || 'Password'}
      secureTextEntry={ !isVisible }
      icon={ isVisible ? visibilityOff : visibility }
      onIconPress={ toggleIsVisible }
      { ...props }
    />
  )
}