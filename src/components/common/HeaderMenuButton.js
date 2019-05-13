import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const HeaderMenuButton = ({ onPress }) => {
    const { buttonStyle } = styles;

    return (
        <Icon
          raised
          name='bars'
          type='font-awesome'
          containerStyle={buttonStyle}
          onPress={onPress}
          underlayColor={'#00BCD6'} // Background color on tap
          color='#00BCD6'
          size={20}
        />
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
        bottom: 0,
        marginLeft: 5,
        marginRight: 5
    }
});

export { HeaderMenuButton };
