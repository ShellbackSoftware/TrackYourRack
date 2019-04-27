import React from 'react';
import { Text, BackHandler, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import NavigationService from '../helpers/NavigationService';
import {
    getUserLists,
    clearListname,
    openModal,
    closeModal,
    getAllPolishes
  } from '../../actions';
import { Card, CardSection, Spinner } from '../common';
import CustomListsList from '../CustomListsList';

class HomeScreen extends React.Component {
  componentDidMount() {
    this.props.getUserLists(this.props.uid);
  }

  willBlur = this.props.navigation.addListener('willBlur', () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  );

  willFocus = this.props.navigation.addListener('willFocus', () => {
      this.props.getUserLists(this.props.uid);
      if (this.props.fromUpload) {
        this.props.getAllPolishes();
      }
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  );

  handleBackButtonClick = () => {
    return true;
  }

  renderLists() {
    if (this.props.loadingLists) {
      return <CardSection style={{ flex: 1 }}><Spinner /></CardSection>;
    }
    return (
      <CustomListsList
        onPress={() => NavigationService.navigate('AddCustomList')}
      />
    );
  }

  render() {
    return (
      <Card style={{ flex: 1 }}>
        <CardSection>
          <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.textStyle}>Welcome, {this.props.username}!</Text>
          <Text style={styles.textStyle}>Select a list of polishes below, or tap
           the menu button in the top right for more options. </Text>
          </View>
        </CardSection>

        {this.renderLists()}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
  }
});

const mapStateToProps = state => {
  const { username, uid } = state.auth;
  const { loadingLists, showModal, userLists } = state.lists;
  const { loadingPolish } = state.polishes;
  const { fromUpload } = state.polish;
  return { username, loadingLists, uid, showModal, userLists, loadingPolish, fromUpload };
};

export default connect(mapStateToProps, {
  getUserLists, clearListname, openModal, closeModal, getAllPolishes
})(HomeScreen);
