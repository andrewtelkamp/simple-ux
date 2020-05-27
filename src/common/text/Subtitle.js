import React from 'react';
import { Text } from 'react-native';
import { Colors } from '../../config';

export const Subtitle = ({ value }) => (
  <Text style={ styles.title }>
    { value }
  </Text>
);

const styles = {
  title: {
    color: Colors.WHITE,
    fontSize: 17,
    fontWeight: '700',
  },
}