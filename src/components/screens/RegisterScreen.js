/* eslint-disable max-len, no-useless-escape */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { usernameChanged, passwordChanged, registerUser } from '../../actions';
import { Button, Card, CardSection, Input, Spinner } from '../common';

class RegisterScreen extends React.Component {
  state = {
    mail: '',
    name: '',
    errorMsg: '',
    message: ''
  };

  ontextChange(field, value) {
    this.setState({ [field]: value });
  }

  onButtonPress() {
    this.setState({ errorMsg: '' });
    if (this.verifyInput()) {
      const { name, mail } = this.state;
      this.props.registerUser({ name, mail });
    }
  }

  verifyInput() {
    const exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!exp.test(this.state.mail)) {
      this.setState({ errorMsg: 'Please enter a valid email.' });
      return false;
    }
    if (!this.state.name) {
      this.setState({ errorMsg: 'Please enter a username.' });
      return false;
    }
    return true;
  }

  renderMessage() {
      if (this.props.error) {
          return (
              <View style={{ backgroundColor: 'white' }}>
                  <Text style={styles.errorTextStyle}>
                    {this.props.error}
                  </Text>
              </View>
          );
      }

      if (this.state.errorMsg) {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <Text style={styles.errorTextStyle}>
                  {this.state.errorMsg}
                </Text>
            </View>
        );
      }

      if (this.props.message) {
        return (
          <View style={{ justifyContent: 'center' }}>
              <Text style={styles.msgTextStyle}>
                {this.props.message}
              </Text>
          </View>
        );
      }
  }

  renderButton() {
      if (this.props.loading) {
        return <Spinner size="large" />;
      }

      // Don't need the button if registration was submitted
      if (this.props.message) { return <View style={{ flex: 1, justifyContent: 'center' }} />; }

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
            onChangeText={this.ontextChange.bind(this, 'mail')}
            value={this.state.mail}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Username"
            onChangeText={this.ontextChange.bind(this, 'name')}
            value={this.state.name}
          />
        </CardSection>

        {this.renderMessage()}

        <CardSection>
          {this.renderButton()}
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
  msgTextStyle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#105915'
  }
});

const mapStateToProps = state => {
  const { username, password, error, loading, message } = state.auth;
  return { username, password, error, loading, message };
};

export default connect(mapStateToProps, {
  usernameChanged,
  passwordChanged,
  registerUser
})(RegisterScreen);
