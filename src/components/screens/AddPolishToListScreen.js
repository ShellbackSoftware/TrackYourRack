import React from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  FlatList
  } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { getUserLists, clearSelectedLists, addPolishToList } from '../../actions';
import { Card, CardSection, Spinner, Button } from '../common';
import CustomListItem from '../CustomListItem';

class AddPolishToListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { polish: this.props.navigation.state.params };
    this.props.getUserLists(this.props.uid);
    this.props.clearSelectedLists();
  }

  onAddPress() {
    const uid = this.props.uid;
    const adds = this.props.selectedLists.map((listid) => {
      return this.props.addPolishToList(uid, listid, this.state.polish.pID);
    });
    Promise.all(adds).then(() => this.props.navigation.pop());
  }

  renderFooter() {
    return (
      <CardSection style={styles.footerStyle}>
        <Button style={{ flex: 1 }} onPress={this.onAddPress.bind(this)}>
          Add polish to selected lists
        </Button>
      </CardSection>
    );
  }

  renderItem(customList) {
    if (customList.item.listname !== this.props.curListName) {
      return (
        <CustomListItem
          curPID={this.state.polish.pID}
          customList={customList}
          addPolishToList
        />
      );
    }
  }

  renderLists() {
    if (this.props.loadingLists) {
      return <CardSection style={{ flex: 1 }}><Spinner /></CardSection>;
    }
    return (
      <CardSection style={styles.sectionStyle}>
        <FlatList
          ref={(ref) => { this.flatListRef = ref; }}
          data={this.props.userLists}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={customList => customList.listID.toString()}
          removeClippedSubviews
          extraData={this.props}
        />
      </CardSection>
    );
  }

  // TODO: Scale the header correctly "Add {polish} to..."
  render() {
    const { polish } = this.state;
    const { containerStyle, headerStyle, buttonStyle, titleStyle } = styles;
    return (
      <Modal
      transparent
      animationType='slide'
      onRequestClose={() => {}}
      >
      <TouchableWithoutFeedback onPress={() => this.props.navigation.pop()}>
      <View style={containerStyle}>
      <TouchableWithoutFeedback>
      <Card style={{ display: 'flex', flex: 1 }}>
      <CardSection style={headerStyle}>
        <Icon
          name='arrow-left'
          type='evilicon'
          containerStyle={buttonStyle}
          onPress={() => this.props.navigation.pop()}
          underlayColor={'#CCDD1F'}
          color='#00BCD6'
          size={40}
        />
          <Text
            adjustsFontSizeToFit
            allowFontScaling
            style={titleStyle}
            numberOfLines={1}
          >
            Add {polish.pName} to ...
          </Text>
        <View style={{ flex: 0.5 }} />
      </CardSection>

        {this.renderLists()}

        {this.renderFooter()}
      </Card>
      </TouchableWithoutFeedback>
      </View>
      </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  sectionStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  titleStyle: {
    flex: 3,
    //fontSize: 18,
    textAlign: 'center',
    alignSelf: 'stretch',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  buttonStyle: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    marginLeft: 5,
    marginRight: 5
  },
  headerStyle: {
    display: 'flex',
    flexDirection: 'row',
    height: 50
  },
});

const mapStateToProps = state => {
  const { uid } = state.auth;
  const { loadingLists, userLists, selectedLists } = state.lists;
  const { curListName } = state.polishes;
  return { uid, loadingLists, userLists, selectedLists, curListName };
};

export default connect(mapStateToProps, {
  getUserLists, clearSelectedLists, addPolishToList
})(AddPolishToListScreen);
