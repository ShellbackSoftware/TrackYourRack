import React from 'react';
import { Text, StyleSheet, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { getUserLists } from '../../actions';
import { Card, CardSection, Spinner } from '../common';
import CustomListsList from '../CustomListsList';

class HomeScreen extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.subs = [
      this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
    ];
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.subs.forEach(sub => sub.remove());
  }

  componentDidFocus() {
    this.props.getUserLists(this.props.uid);
  }

  handleBackButtonClick = () => {
    return true;
  }

  renderLists() {
    if (this.props.loadingLists) {
      return <Spinner />;
    }
    return <CustomListsList />;
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
          {this.renderLists()}
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
  const { username, uid } = state.auth;
  const { loadingLists } = state.lists;
  return { username, loadingLists, uid };
};

export default connect(mapStateToProps, { getUserLists })(HomeScreen);
