import React from 'react';
import { Text, View, TouchableWithoutFeedback, Modal, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getUserLists } from '../../actions';
import { Card, CardSection, Spinner } from '../common';
import CustomListsList from '../CustomListsList';

class AddPolishToListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { polish: this.props.navigation.state.params };
    this.props.getUserLists(this.props.uid);
  }

  onButtonPress() {
    console.log(this.state);
  }

  renderLists() {
    if (this.props.loadingLists) {
      return <CardSection style={{ flex: 1 }}><Spinner /></CardSection>;
    }
    return (
      <CustomListsList
        addPolishToList
        onPress={() => this.onButtonPress.bind(this)}
      />
    );
  }

  render() {
    const { polish } = this.state;
    const { containerStyle } = styles;
    return (
      <Modal
      transparent
      animationType='slide'
      onRequestClose={() => {}}
      >
      <TouchableWithoutFeedback onPress={() => this.props.navigation.pop()}>
      <View style={containerStyle}>
      <TouchableWithoutFeedback>
      <Card>
        <CardSection>
          <Text>Which list would you like to add {polish.pName} to?</Text>
        </CardSection>

        {this.renderLists()}
      </Card>
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
  }
});

const mapStateToProps = state => {
  const { uid } = state.auth;
  const { loadingLists } = state.lists;
  return { uid, loadingLists };
};

export default connect(mapStateToProps, { getUserLists })(AddPolishToListScreen);
