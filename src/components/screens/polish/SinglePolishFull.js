import React from 'react';
import { Text, StyleSheet, Modal, View, Image, TouchableWithoutFeedback } from 'react-native';
import { CardSection, Button } from '../../common';

class SinglePolishFull extends React.Component {
  render() {
    const {
      titleStyle,
      containerStyle,
      sectionStyle,
      imageStyle,
      iContainerStyle
    } = styles;
    const { visible, polish, closeModal } = this.props;
    /*
      TouchableWithoutFeedback for tap to close
      View for wrapper
      Touchablewithoutfeedback, no onpress to disable close IN modal
      View for actual modal
    */
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
          <Text style={titleStyle}>{polish.pName}</Text>
        </CardSection>

        <CardSection>
          <View style={iContainerStyle}>
            <Image
              style={imageStyle}
              source={{ uri: polish.path }}
            />
          </View>
        </CardSection>

        <CardSection>
          <Text>{`
          Brand:
          Finish:
          etc. etc.
          `}</Text>
        </CardSection>

        <CardSection>
          <Button> Add To List </Button>
          <Button> Edit Polish </Button>
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
  imageStyle: {
    flex: 1,
    width: 200,
    height: 300
  },
  iContainerStyle: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});

export default SinglePolishFull;
