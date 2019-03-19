import React from 'react';
import {
      Text,
      StyleSheet,
      TouchableOpacity,
      View
      } from 'react-native';
import NavigationService from '../components/helpers/NavigationService';
import { CardSection } from './common';

class CustomListItem extends React.Component {
  onRowPress() {
    const { listname, listID } = this.props.customList.item;
    NavigationService.navigate('PolishList', { listname, listID });
  }

  render() {
    const { listname } = this.props.customList.item;
    return (
      <TouchableOpacity
        onPress={this.onRowPress.bind(this)}
      >
        <View>
          <CardSection>
          <Text style={styles.titleStyle}>
            {listname}
          </Text>
        </CardSection>
        </View>
      </TouchableOpacity>
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
