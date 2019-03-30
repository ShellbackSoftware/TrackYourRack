import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import NavigationService from '../helpers/NavigationService';
import { usernameChanged, passwordChanged, loginUser } from '../../actions';
import { Button, Card, CardSection, Input, Spinner, A } from '../common';

class LoginScreen extends React.Component {
  onUsernameChange(text) {
      this.props.usernameChanged(text);
  }

  onPasswordChange(text) {
      this.props.passwordChanged(text);
  }

  onButtonPress() {
      const { username, password } = this.props;
      this.props.loginUser({ username, password });
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
        return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Text>Welcome to Track Your Rack! Please log in to continue.</Text>
        </CardSection>

        <CardSection>
          <Input
            label="Username"
            onChangeText={this.onUsernameChange.bind(this)}
            value={this.props.username}
          />
        </CardSection>

        <CardSection>
          <Input
              secureTextEntry
              label="Password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
          />
        </CardSection>

        {this.renderError()}

        <CardSection style={styles.sectionStyle}>
          {this.renderButton()}
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <A
            style={styles.linkStyle}
            onPress={() => NavigationService.navigate('Password')}
            title='Forgot your password?'
          />
          <View style={{ height: 10 }} />
          <A
            style={styles.linkStyle}
            onPress={() => NavigationService.navigate('Register')}
            title='Create an account'
          />
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  sectionStyle: {
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  linkStyle: {
    height: 20
  }
});

const mapStateToProps = state => {
  const { username, password, error, loading } = state.auth;
  return { username, password, error, loading };
};

export default connect(mapStateToProps, {
  usernameChanged,
  passwordChanged,
  loginUser
})(LoginScreen);
