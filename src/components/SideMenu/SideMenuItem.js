import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SideMenuItem = ({ onPress, children }) => {
  const { textStyle, itemStyle } = styles;
    return (
      <TouchableOpacity onPress={onPress} style={itemStyle}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  textStyle: {

  },
  itemStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
});

export { SideMenuItem };
