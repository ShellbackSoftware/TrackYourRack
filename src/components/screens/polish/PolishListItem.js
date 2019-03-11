import React from 'react';
import {
      Text,
      StyleSheet,
      TouchableWithoutFeedback,
      View
      } from 'react-native';
//import NavigationService from '../../helpers/NavigationService';
import { CardSection } from '../../common';

class PolishListItem extends React.Component {
  onRowPress() {
    //const polish = this.props.polishItem;
    //NavigationService.navigate('SinglePolish', { polish });
    /*const { listName } = this.props.customList.item;
    NavigationService.navigate('PolishList', { listName });*/
  }

  render() {
    const polish = this.props.polishItem;
    return (
      <TouchableWithoutFeedback
        onPress={this.onRowPress.bind(this)}
      >
        <View>
          <CardSection>
          <Text style={styles.titleStyle}>
            {polish.pName}
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

export default PolishListItem;
