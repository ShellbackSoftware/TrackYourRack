import React from 'react';
import { Text, StyleSheet, Modal, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { deleteList } from '../../actions';
import { CardSection, Button } from '../common';

class AddPolishScreen extends React.Component {
  renderModal() {
    const {
      titleStyle,
      sectionStyle,
      btnContainerStyle
    } = styles;
    const { navigation } = this.props;
    return (
      <View>
        <CardSection style={sectionStyle}>
          <Text style={titleStyle}>Add A Polish</Text>
        </CardSection>

        <CardSection style={btnContainerStyle}>
          <Text>Form here</Text>
        </CardSection>

        <CardSection>
          <Button>
            Submit
          </Button>
          <Button onPress={() => navigation.goBack()}>
            Cancel
          </Button>
        </CardSection>
      </View>
    );
  }

  render() {
    const {
      containerStyle,
    } = styles;
    const { navigation } = this.props;
    return (
      <Modal
      transparent
      animationType='slide'
      onRequestClose={() => {}}
      >
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={containerStyle}>
      <TouchableWithoutFeedback>
        {this.renderModal()}
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
  btnContainerStyle: {
    borderBottomWidth: 0
  },
  dangerStyle: {
    borderColor: 'red'
  },
  dangerTextStyle: {
    color: 'red'
  }
});

const mapStateToProps = state => {
  const { uid } = state.auth;
  return { uid };
};

export default connect(mapStateToProps, {
  deleteList
})(AddPolishScreen);
