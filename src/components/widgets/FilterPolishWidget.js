import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
//import { CardSection, Input } from './common';

class FilterPolishWidget extends React.Component {

  render() {
    const { containerStyle } = styles;
    return (
        <View style={containerStyle}>
          <Text>Filter block</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    position: 'relative'
  },
});

const mapStateToProps = state => {
  const { username, password, error, loading } = state.auth;
  return { username, password, error, loading };
};

export default connect(mapStateToProps, {
})(FilterPolishWidget);
