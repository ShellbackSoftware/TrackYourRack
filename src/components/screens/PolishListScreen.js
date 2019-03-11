import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class PolishListScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>List of polishes in this list</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { loading, uid, token } = state.auth;
  return { loading, uid, token };
};

export default connect(mapStateToProps, {})(PolishListScreen);
