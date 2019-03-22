import React from 'react';
import { Text, StyleSheet, Modal, View, TouchableWithoutFeedback } from 'react-native';
import { CardSection, Button } from './common';

class EditCustomList extends React.Component {
  render() {
    const {
      titleStyle,
      containerStyle,
      sectionStyle,
      dangerStyle
    } = styles;
    const { visible, closeModal } = this.props;
    return (
      <Modal
      visible={visible}
      transparent
      animationType='slide'
      onRequestClose={() => {}}
      >
      <TouchableWithoutFeedback onPress={closeModal}>
      <View style={containerStyle}>
      <TouchableWithoutFeedback>
      <View>
        <CardSection style={sectionStyle}>
          <Text style={titleStyle}>List Title</Text>
        </CardSection>

        <CardSection>
          <Button> Edit List </Button>
        </CardSection>

        <CardSection>
          <Button style={dangerStyle}> Delete List </Button>
          <Button onPress={closeModal}> Close </Button>
        </CardSection>
      </View>
      </TouchableWithoutFeedback>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
    );
  }
}

const styles = StyleSheet.create({
  sectionStyle: {
    justifyContent: 'center'
  },
  titleStyle: {
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
  },
  dangerStyle: {
    backgroundColor: 'red'
  }
});

export default EditCustomList;
