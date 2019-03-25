import React from 'react';
import {
      Text,
      StyleSheet,
      TouchableOpacity,
      View,
      Image
      } from 'react-native';
import { connect } from 'react-redux';
import {
  SWATCH_PATH,
  DEFAULT_SWATCH
} from '../../../actions/constants';
import { setEditMode, clearEditMode } from '../../../actions';
import SinglePolishFull from './SinglePolishFull';
import { CardSection } from '../../common';

class PolishListItem extends React.PureComponent {
  state = {
    showModal: false,
    selected: false
  };

  onPress() {
    if (this.props.editMode) {
      this.setState({ selected: !this.state.selected });
    } else {
      this.toggleModal();
    }
  }

  onLongPress() {
    this.toggleEditMode();
  }

  setStyle() {
    if (this.props.editMode && this.state.selected) {
      return {
        backgroundColor: '#B39DD6',
      };
    }
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  toggleEditMode() {
    if (this.props.editMode) {
      this.props.clearEditMode();
    } else {
      this.props.setEditMode();
    }
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
      <CardSection style={this.setStyle()}>
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
        onPress={this.onPress.bind(this)}
        onLongPress={this.onLongPress.bind(this)}
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

const mapStateToProps = state => {
  const { editMode } = state.polishes;
  return { editMode };
};

export default connect(mapStateToProps, {
  setEditMode, clearEditMode
})(PolishListItem);

