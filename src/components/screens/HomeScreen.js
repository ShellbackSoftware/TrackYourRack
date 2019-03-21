import React from 'react';
import { Text, StyleSheet, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { getUserLists, clearListname, openModal, closeModal } from '../../actions';
import { Card, CardSection, Spinner } from '../common';
import CustomListsList from '../CustomListsList';
import AddCustomList from '../AddCustomList';

class HomeScreen extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.subs = [
      this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
    ];
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.subs.forEach(sub => sub.remove());
  }

  componentDidFocus() {
    this.props.getUserLists(this.props.uid);
  }

  handleBackButtonClick = () => {
    return true;
  }

  toggleModal() {
    this.props.clearListname();
    if (this.props.showModal) {
      this.props.closeModal();
    } else {
      this.props.openModal();
    }
  }

  renderLists() {
    if (this.props.loadingLists) {
      return <CardSection style={{ flex: 1 }}><Spinner /></CardSection>;
    }
    return (
      <CustomListsList
        onPress={() => this.toggleModal()}
      />
    );
  }

  render() {
    // eslint-disable-next-line
    const { containerStyle } = styles;
    return (
      <Card style={{ flex: 1 }}>
        <CardSection>
          <Text>Welcome, {this.props.username}!</Text>
          <Text>Select a list of polishes below, or tap on the menu button for more options.</Text>
        </CardSection>

        {this.renderLists()}

        <AddCustomList
          visible={this.props.showModal}
          closeModal={this.toggleModal.bind(this)}
        />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  }
});

const mapStateToProps = state => {
  const { username, uid } = state.auth;
  const { loadingLists, showModal, userLists } = state.lists;
  return { username, loadingLists, uid, showModal, userLists };
};

export default connect(mapStateToProps, {
  getUserLists, clearListname, openModal, closeModal
})(HomeScreen);
