import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { usernameChanged, passwordChanged, loginUser } from '../../actions';
import { Button, Card, CardSection, Input, Spinner } from '../common';

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

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <CardSection>
          <Text>Forgot your password?</Text>
          <Text>Need an account?</Text>
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
