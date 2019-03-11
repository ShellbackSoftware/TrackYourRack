import React from 'react';
import { Text, View, Modal, StyleSheet } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({
  children, acceptText, declineText, onAccept, onDecline, visible
}) => {
  const { containerStyle, textStyle, sectionStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType='slide'
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={sectionStyle}>
          <Text style={textStyle}>{children}</Text>
        </CardSection>

        <CardSection>
          <Button onPress={onAccept}> {acceptText} </Button>
          <Button onPress={onDecline}> {declineText} </Button>
        </CardSection>

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    sectionStyle: {
      justifyContent: 'center'
    },
    textStyle: {
      flex: 1,
      fontSize: 18,
      textAlign: 'center',
      lineHeight: 40
    },
    containerStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      position: 'relative',
      flex: 1,
      justifyContent: 'center'
    }
});

export { Confirm };
