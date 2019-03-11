import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const HeaderMenuButton = ({ onPress }) => {
    const { buttonStyle } = styles;

    return (
      <TouchableOpacity onPress={onPress}>
        <Icon
          raised
          name='bars'
          type='font-awesome'
          style={buttonStyle}
        />
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007AFF',
        marginLeft: 5,
        marginRight: 5
    }
});

export { HeaderMenuButton };
