import React from 'react';
import { Text, StyleSheet, Modal, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { listnameChanged, createList } from '../actions';
import { CardSection, Button, Input } from './common';

class AddCustomList extends React.Component {
  state = { error: false };

  onListnameChange(text) {
    this.props.listnameChanged(text);
  }

  onButtonPress() {
    this.setState({ error: false });
    if (this.props.listname.trim() === '') {
      this.setState({ error: true, errorMsg: 'The list needs a name!' });
    } else if (this.props.userLists.some(list => list.listname === this.props.listname.trim())) {
      this.setState({ error: true, errorMsg: 'This list already exists!' });
    } else {
      this.props.createList(this.props.uid, this.props.listname);
    }
  }

  renderError() {
    if (this.state.error) {
      return (
          <View style={{ backgroundColor: 'white' }}>
              <Text style={styles.errorTextStyle}>
                {this.state.errorMsg}
              </Text>
          </View>
      );
  }
  }

  render() {
    const {
      titleStyle,
      containerStyle,
      sectionStyle,
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
          <Text style={titleStyle}>Create a New List</Text>
        </CardSection>

        <CardSection style={sectionStyle}>
          <Input
            label="List Name"
            defaultValue=''
            onChangeText={this.onListnameChange.bind(this)}
            value={this.props.listname}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}> Save List </Button>
          <Button onPress={closeModal}> Cancel </Button>
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
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});

const mapStateToProps = state => {
  const { listname, userLists } = state.lists;
  const { uid } = state.auth;
  return { uid, listname, userLists };
};

export default connect(mapStateToProps, {
  createList, listnameChanged
})(AddCustomList);
