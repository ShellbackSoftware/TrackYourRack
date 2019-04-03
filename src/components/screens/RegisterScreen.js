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
      const { name, mail } = this.props;
      this.props.registerUser({ name, mail });
      this.setState({ message: `Thank you for registering at Shellback Software! Please check your email (${mail}) for further instructions.` });
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

      if (this.state.message) {
        return (
          <View style={{ backgroundColor: 'white' }}>
              <Text style={styles.errorTextStyle}>
                {this.state.message}
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
  }
});

const mapStateToProps = state => {
  const { username, password, error, loading } = state.auth;
  return { username, password, error, loading };
};

export default connect(mapStateToProps, {
  usernameChanged,
  passwordChanged,
  registerUser
})(RegisterScreen);
