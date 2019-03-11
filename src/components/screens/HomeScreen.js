import React from 'react';
import { Text, StyleSheet, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from '../common';
import CustomListsList from '../CustomListsList';

class HomeScreen extends React.Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    return true;
  }

  render() {
    // eslint-disable-next-line
    const { containerStyle } = styles;

    return (
      <Card>
        <CardSection>
          <Text>Welcome, {this.props.username}!</Text>
          <Text>Select a list of polishes below, or tap on the menu button for more options.</Text>
        </CardSection>

        <CardSection>
          <CustomListsList />
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  }
});

const mapStateToProps = state => {
  const { username, error, loading, uid, token } = state.auth;
  return { username, error, loading, uid, token };
};

export default connect(mapStateToProps, {})(HomeScreen);
