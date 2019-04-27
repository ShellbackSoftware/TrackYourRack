import React from 'react';
import { Text, StyleSheet, Modal, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { deleteList, clearPolishState } from '../../actions';
import { CardSection, Button } from '../common';
import EditListWidget from '../widgets/EditListWidget';

class EditListScreen extends React.Component {
  state = {
    editList: false
  }

  deleteList() {
    // TODO: Add a confirmation popup
    const curList = this.props.navigation.getParam('curList', 'List');
    this.props.deleteList(this.props.uid, curList.listID);
  }

  willBlur = this.props.navigation.addListener('willBlur', () => {
      this.props.clearPolishState();
    }
  );

  renderWidget() {
    return (
      <EditListWidget {...this.props} />
    );
  }

  renderModal() {
    const {
      titleStyle,
      sectionStyle,
      dangerStyle,
      dangerTextStyle,
      btnContainerStyle
    } = styles;
    const { navigation } = this.props;
    const curList = navigation.getParam('curList', 'List');
    if (this.state.editList) {
      return this.renderWidget();
    }
    return (
      <View>
        <CardSection style={sectionStyle}>
          <Text style={titleStyle}>Manage {curList.listname}</Text>
        </CardSection>

        {/*<CardSection style={btnContainerStyle}>
          <Button> Rename {curList.listname}</Button>
    </CardSection>*/}
        <CardSection style={btnContainerStyle}>
          <Button onPress={() => this.setState({ editList: true })}>
            Add Polishes to {curList.listname}
          </Button>
        </CardSection>

        <CardSection>
          <Button
            btnStyle={dangerStyle}
            tStyle={dangerTextStyle}
            onPress={() => this.deleteList()}
          >
          Delete {curList.listname}
          </Button>

          <Button onPress={() => navigation.goBack()}> Close </Button>
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
    borderColor: 'red',
    backgroundColor: '#fff'
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
  deleteList, clearPolishState
})(EditListScreen);
