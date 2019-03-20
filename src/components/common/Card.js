import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => (
  <View style={[styles.containerStyle, props.style]}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    margin: 5
  }
});

export { Card };
