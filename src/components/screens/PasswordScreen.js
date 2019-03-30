/* eslint-disable max-len, no-useless-escape */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
//import { usernameChanged, passwordChanged, loginUser } from '../../actions';
import { Button, Card, CardSection, Input, Spinner } from '../common';

class PasswordScreen extends React.Component {
  state = {
    mail: '',
    errorMsg: ''
  };

  ontextChange(text) {
    this.setState({ mail: text });
  }

  onButtonPress() {
    this.setState({ errorMsg: '' });
    if (this.verifyMail()) {
      this.props.resetPassword(this.state.mail);
    } else {
      this.setState({ errorMsg: 'Please enter a valid email!' });
    }
  }

  verifyEmail() {
    const exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return exp.test(this.state.mail);
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
          <View style={{ backgroundColor: 'white' }}>
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

      return (
        <Button onPress={this.onButtonPress.bind(this)}>
          Reset Password
        </Button>
      );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Text>Please enter the email associated with your Shellback Software account.</Text>
        </CardSection>

        <CardSection>
          <Input
            label="Email"
            onChangeText={this.ontextChange.bind(this)}
            value={this.state.mail}
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
    fontSize: 20,
    alignSelf: 'center'
  }
});

const mapStateToProps = state => {
  const { username, password, error, loading, message } = state.auth;
  return { username, password, error, loading, message };
};

export default connect(mapStateToProps, { })(PasswordScreen);
