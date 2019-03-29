import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
//import { usernameChanged, passwordChanged, loginUser } from '../../actions';
import { Button, Card, CardSection, Input, Spinner } from '../common';

class PasswordScreen extends React.Component {
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
      if (this.state.error) {
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
              <Text style={styles.errorTextStyle}>
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
          Submit Registration
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
            onChangeText={this.onEmailChange.bind(this)}
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
  }
});

const mapStateToProps = state => {
  const { username, password, error, loading, message } = state.auth;
  return { username, password, error, loading, message };
};

export default connect(mapStateToProps, { })(PasswordScreen);
