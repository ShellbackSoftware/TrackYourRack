import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from '../common';

class FollowingScreen extends React.Component {
  render() {
    // eslint-disable-next-line
    const { containerStyle } = styles;

    return (
      <Card>
        <CardSection>
          <Text>Friends list is coming soon!</Text>
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

export default connect(mapStateToProps, {})(FollowingScreen);
