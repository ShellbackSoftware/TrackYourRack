import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from '../common';

class AboutScreen extends React.Component {
  render() {
    // eslint-disable-next-line
    const { containerStyle } = styles;

    return (
      <Card>
        <CardSection>
          <Text>Description on how to use the app</Text>
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

export default connect(mapStateToProps, {})(AboutScreen);
