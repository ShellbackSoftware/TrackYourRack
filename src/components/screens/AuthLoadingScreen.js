/* eslint-disable no-underscore-dangle */
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { SecureStore } from 'expo';
import NavigationService from '../helpers/NavigationService';
import { Card, CardSection, Spinner } from '../common';
import { authenticateUser, getAllPolishes, setUserToken } from '../../actions';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  state = { token: '', uid: '', username: '', lotoken: '' };

  willFocus = this.props.navigation.addListener('willFocus', () => {
      this._bootstrapAsync();
    }
  );

  _bootstrapAsync = async () => {
    const lotokenPromise = SecureStore.getItemAsync('lotoken')
      .then(token => this.setState({ token }));
    const tokenPromise = this.props.setUserToken()
      .then(() => this.setState({ token: this.props.token }));
    const namePromise = SecureStore.getItemAsync('username')
      .then(username => this.setState({ username }));
    const uidPromise = SecureStore.getItemAsync('uid')
      .then(uid => this.setState({ uid }));
    const polishesPromise = this.props.getAllPolishes();
    Promise.all([lotokenPromise, tokenPromise, namePromise, uidPromise, polishesPromise])
    .then(() => {
      const userObj = {
        username: this.state.username,
        uid: this.state.uid,
        token: this.state.token,
        lotoken: this.state.lotoken
      };
      if (userObj.username === null || userObj.uid === null ||
          userObj.token === null || userObj.lotoken === null) {
        NavigationService.navigate('Login');
      } else {
        this.props.authenticateUser(userObj);
        NavigationService.navigate('Home');
      }
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

export default connect(mapStateToProps, {
  authenticateUser, getAllPolishes, setUserToken
})(AuthLoadingScreen);
