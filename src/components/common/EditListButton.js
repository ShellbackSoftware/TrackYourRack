import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import NavigationService from '../helpers/NavigationService';
import { AddPolishButton } from './AddPolishButton';

const EditListButton = ({ onPress, screen }) => {
    const { buttonStyle } = styles;
    if (screen === 'All Polishes') {
      return (
        <AddPolishButton
          onPress={() => NavigationService.navigate('AddPolish')}
        />
    );
    }

    return (
        <Icon
          raised
          name='edit'
          type='font-awesome'
          containerStyle={buttonStyle}
          onPress={onPress}
          underlayColor={'#CCDD1F'}
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

export { EditListButton };
