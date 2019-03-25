/* eslint-disable no-underscore-dangle */
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { SecureStore } from 'expo';
import NavigationService from '../helpers/NavigationService';
import { Card, CardSection, Spinner } from '../common';
import { authenticateUser, getAllPolishes } from '../../actions';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    console.log('constructor');
    super(props);
    this._bootstrapAsync();
  }
  state = { token: '', uid: '', username: '' };

  _bootstrapAsync = async () => {
    console.log('Start promise');
    const tokenPromise = SecureStore.getItemAsync('token')
      .then(token => this.setState({ token }));
    const namePromise = SecureStore.getItemAsync('username')
      .then(username => this.setState({ username }));
    const uidPromise = SecureStore.getItemAsync('uid')
      .then(uid => this.setState({ uid }));
    const polishesPromise = this.props.getAllPolishes();
    Promise.all([tokenPromise, namePromise, uidPromise, polishesPromise])
    .then(() => {
      const userObj = {
        username: this.state.username,
        uid: this.state.uid,
        token: this.state.token
      };
      console.log('after promise, before authenticate');
      this.props.authenticateUser(userObj);
      console.log('After authenticate');
      NavigationService.navigate(this.state.token ? 'Home' : 'Login');
    });
  };

  render() {
    return (
      <Card>
        <CardSection style={styles.containerStyle}>
          <Text>Loading, please wait...</Text>
          <Spinner />
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 0
  }
});

const mapStateToProps = state => {
  const { username, uid, token } = state.auth;
  return { username, uid, token };
};

export default connect(mapStateToProps, { authenticateUser, getAllPolishes })(AuthLoadingScreen);
