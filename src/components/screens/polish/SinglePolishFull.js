import React from 'react';
import { Text, StyleSheet, Modal, View, Image, TouchableWithoutFeedback } from 'react-native';
import NavigationService from '../../helpers/NavigationService';
import { CardSection, Button } from '../../common';

class SinglePolishFull extends React.Component {
  addToList() {
    NavigationService.navigate('AddPolishToList', this.props.polish);
  }

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
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center' }}>Brand: {polish.pBrand} </Text>
            <Text style={{ textAlign: 'center' }}>Collection: {polish.pCollection} </Text>
            <Text style={{ textAlign: 'center' }}>Finish: {polish.pFinish} </Text>
            <Text style={{ textAlign: 'center' }}>Number: {polish.pNumber} </Text>
            <Text style={{ textAlign: 'center' }}>Release Season: {polish.pSeason} </Text>
            <Text style={{ textAlign: 'center' }}>Release Year: {polish.pYear} </Text>
            <Text style={{ textAlign: 'center' }}>Website: {polish.pSite} </Text>
          </View>
        </CardSection>

        <CardSection>
          <Button onPress={this.addToList.bind(this)}> Add To List </Button>
          {/*<Button> Edit Polish </Button>*/}
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
