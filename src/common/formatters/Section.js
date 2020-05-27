import React from 'react';
import { View } from 'react-native';

export const Section = ({
  children,
  isSmall = false,
  isLarge = false,
  isXLarge = false,
}) => {
  let marginBottom = 10;

  if (isSmall) {
    marginBottom = 5;
  }

  if (isLarge) {
    marginBottom = 20;
  }

  if (isXLarge) {
    marginBottom = 40;
  }

  return (
    <View style={{ marginBottom }}>
      { children }
    </View>
  )
}