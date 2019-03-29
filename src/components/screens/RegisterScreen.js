import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { usernameChanged, passwordChanged, loginUser } from '../../actions';
import { Button, Card, CardSection, Input, Spinner } from '../common';

class RegisterScreen extends React.Component {
  state = {
    mail: '',
    name: '',
    pass: '',
    vPass: '',
    errorMsg: ''
  };

  ontextChange(field, value) {
    this.setState({ [field]: value });
  }

  onButtonPress() {
    this.setState({ errorMsg: '' });
    if (this.verifyPassword()) {
      const { name, mail, pass } = this.props;
      this.props.registerUser({ name, mail, pass });
    } else {
      this.setState({ errorMsg: 'Passwords must match!' });
      console.log('Incorrect password');
    }
  }

  verifyPassword() {
    return this.state.pass === this.state.vPass;
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

  renderButton() {
      if (this.props.loading) {
          return <Spinner size="large" />;
      }

      return (
        <Button onPress={this.onButtonPress.bind(this)}>
          Submit Registration
        </Button>
      );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Text>Register an Account</Text>
        </CardSection>

        <CardSection>
          <Input
            label="Email"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.state.mail}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Username"
            onChangeText={this.onUsernameChange.bind(this)}
            value={this.state.name}
          />
        </CardSection>

        <CardSection>
          <Input
              secureTextEntry
              label="Password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.state.pass}
          />
        </CardSection>

        <CardSection>
          <Input
              secureTextEntry
              label="Verify Password"
              onChangeText={this.onvPasswordChange.bind(this)}
              value={this.state.vPass}
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
})(RegisterScreen);
