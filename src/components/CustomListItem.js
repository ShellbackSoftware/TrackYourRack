import React from 'react';
import {
      Text,
      StyleSheet,
      TouchableOpacity,
      View
      } from 'react-native';
import { connect } from 'react-redux';
import NavigationService from '../components/helpers/NavigationService';
import { CardSection } from './common';
import { addSelPolish, remSelPolish } from '../actions';

class CustomListItem extends React.Component {
  state = { selected: false };

  onRowPress() {
    if (this.props.addPolishToList) {
      if (this.state.selected) {
        this.setState({ selected: false });
        this.props.remSelPolish(this.props.curPID);
      } else {
        this.setState({ selected: true });
        this.props.addSelPolish(this.props.curPID);
      }
      return;
    }
    const { listname, listID } = this.props.customList.item;
    NavigationService.navigate('PolishList', { listname, listID });
  }

  setStyle() {
    if (this.state.selected) {
      return {
        backgroundColor: '#B39DD6',
        justifyContent: 'center'
      };
    }
    return {
      justifyContent: 'center'
    };
  }

  render() {
    const { listname } = this.props.customList.item;
    return (
      <TouchableOpacity
        onPress={this.onRowPress.bind(this)}
      >
        <View>
          <CardSection style={this.setStyle()}>
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
    paddingLeft: 15,
    textAlign: 'center'
  }
});

const mapStateToProps = () => {
  return { };
};

export default connect(mapStateToProps, { addSelPolish, remSelPolish })(CustomListItem);
