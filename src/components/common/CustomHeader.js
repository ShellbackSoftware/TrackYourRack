import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Header } from 'react-navigation';
import { LinearGradient } from 'expo';

const CustomHeader = props => {
const { viewStyle } = styles;
return (
    <View style={viewStyle}>
        <LinearGradient
        colors={['#6200EE', '#00BCD6']}
        >
          <Header {...props} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
    viewStyle: {
      marginTop: Platform.OS === 'ios' ? 20 : 0
    },
    textStyle: {
        fontSize: 20
    }
});

export { CustomHeader };
