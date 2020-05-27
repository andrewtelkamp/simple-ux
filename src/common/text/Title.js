import React from 'react';
import { Text } from 'react-native';
import { Colors } from '../../config';

export const Title = ({ value }) => (
  <Text style={ styles.title }>
    { value }
  </Text>
);

const styles = {
  title: {
    color: Colors.BLACK,
    fontSize: 20,
    fontWeight: '800',
  },
}