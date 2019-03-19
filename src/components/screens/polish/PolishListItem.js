import React from 'react';
import {
      Text,
      StyleSheet,
      TouchableOpacity,
      View,
      Image
      } from 'react-native';
import {
  SWATCH_PATH,
  DEFAULT_SWATCH
} from '../../../actions/constants';
//import NavigationService from '../../helpers/NavigationService';
import SinglePolishFull from './SinglePolishFull';
import { CardSection } from '../../common';

class PolishListItem extends React.PureComponent {
  state = {
    showModal: false,
  };

  onRowPress() {
    //const polish = this.props.polishItem;
    //NavigationService.navigate('SinglePolish', { polish });
    /*const { listName } = this.props.customList.item;
    NavigationService.navigate('PolishList', { listName });*/
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  renderRow() {
    const { thumbnailStyle, titleStyle, tContainerStyle } = styles;
    const polish = this.props.polishItem;
    if (polish.filename && polish.filename !== '') {
      polish.path = SWATCH_PATH + encodeURI(polish.filename);
    } else {
      polish.path = DEFAULT_SWATCH;
    }

    return (
      <CardSection>
        <View style={tContainerStyle}>
          <Image
            style={thumbnailStyle}
            source={{ uri: polish.path }}
          />
        </View>
          <Text style={titleStyle}>
          {polish.pName} {'\n'}
          {polish.pBrand}
        </Text>
      </CardSection>
    );
  }

  render() {
    return (
      <View>
      <TouchableOpacity
        onPress={this.toggleModal.bind(this)}
      >
        <View>
         {this.renderRow()}
        </View>
      </TouchableOpacity>

      <SinglePolishFull
        visible={this.state.showModal}
        polish={this.props.polishItem}
        closeModal={this.toggleModal.bind(this)}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    paddingLeft: 10,
    flexDirection: 'column'
  },
  thumbnailStyle: {
    padding: 5,
    width: 50,
    height: 50
  },
  tContainerStyle: {
    borderRadius: 10,
    overflow: 'hidden'
  }
});

export default PolishListItem;
