import React from 'react';
import {
      Text,
      StyleSheet,
      TouchableWithoutFeedback,
      View
      } from 'react-native';
import NavigationService from '../components/helpers/NavigationService';
import { CardSection } from './common';

class CustomListItem extends React.Component {
  onRowPress() {
    const { listName } = this.props.customList.item;
    NavigationService.navigate('PolishList', { listName });
  }

  render() {
    const { listName } = this.props.customList.item;
    return (
      <TouchableWithoutFeedback
        onPress={this.onRowPress.bind(this)}
      >
        <View>
          <CardSection>
          <Text style={styles.titleStyle}>
            {listName}
          </Text>
        </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
});

export default CustomListItem;
