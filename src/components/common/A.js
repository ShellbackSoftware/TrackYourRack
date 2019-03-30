import React from 'react';
import {
  Linking,
  Text,
  StyleSheet
} from 'react-native';

class A extends React.Component {
  constructor() {
      super();
      this.goToURL = this.goToURL.bind(this);
  }

  goToURL() {
    const { url } = this.props;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        console.log(`Can't open ${this.props.url}`);
      }
    });
  }

  render() {
    const { title } = this.props;
    if (this.props.url) {
      return (
        <Text style={styles.title} onPress={this.goToURL}>
        > {title}
        </Text>
      );
    }
    return (
      <Text style={styles.title} onPress={this.props.onPress}>
      > {title}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#1034A6',
    fontWeight: 'bold'
  }
});

export default A;
