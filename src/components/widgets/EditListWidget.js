import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Button, CardSection, Spinner } from '../common';
import {
    getPolishList,
    clearEditMode,
    searchtermChanged,
    addPolishToList
  } from '../../actions';
import PolishListItem from '../screens/polish/PolishListItem';
// Only used to add polishes to list.
class EditListWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polishes: [],
      tempPolishes: []
    };
    const curList = this.props.navigation.getParam('curList', 'List');
    this.state.listname = curList.listname;
    this.state.listid = curList.listID;
    this.props.getPolishList(curList.listID);
  }

  componentDidUpdate(prevProps) {
    if (this.props.curPolishes !== prevProps.curPolishes) {
      this.getListContent();
    }
  }

  onSearchTermChange(text) {
    this.props.searchtermChanged(text);
    const results = this.state.polishes.filter(polish => {
        const pData = `${polish.pName.toUpperCase()}${polish.pBrand.toUpperCase()}`;
        const termData = text.toUpperCase();
        return pData.indexOf(termData) > -1;
      });

      this.setState({ tempPolishes: results });
  }

  onCancelPress() {
    this.props.clearEditMode();
    this.props.navigation.goBack();
  }

  getListContent() {
    const { allPolishes, curPolishes } = this.props;
    const temp = _.intersectionBy(allPolishes, curPolishes, 'pID');
    const polishes = allPolishes.filter(p => !temp.includes(p));
    this.setState({ polishes, tempPolishes: polishes });
  }

  saveChanges() {
    const uid = this.props.uid;
    const listid = this.state.listid;
    // eslint-disable-next-line
    this.props.selectedPolishes.map((p) => {
      this.props.addPolishToList(uid, listid, p, 'PolishList');
    });
  }

  renderHeader() {
    return (
      <SearchBar
        inputStyle={styles.searchInputStyle}
        containerStyle={styles.searchContainerStyle}
        placeholder="Search For Polish . . ."
        lightTheme
        round
        onChangeText={this.onSearchTermChange.bind(this)}
        autoCorrect={false}
        onClear={() => this.getListContent()}
        value={this.props.searchTerm}
      />
    );
  }

  renderItem(polishList) {
    return <PolishListItem polishItem={polishList.item} />;
  }

  render() {
    if (this.props.loadingPolish) {
      return (
        <View>
          <CardSection>
            <Text>Loading polishes, please wait. This may take a moment!</Text>
          </CardSection>

          <CardSection>
            <Spinner size="large" />
          </CardSection>
        </View>
      );
    }

    const {
      containerStyle,
      sectionStyle,
      titleStyle,
      headerStyle,
      footerStyle
    } = styles;
    return (
      <View style={containerStyle}>
        <CardSection style={headerStyle}>
          <Text style={titleStyle}>Add Polishes To {this.state.listname}</Text>
        </CardSection>

        <CardSection>
          {this.renderHeader()}
        </CardSection>

        <CardSection style={sectionStyle}>
            <FlatList
              data={this.state.tempPolishes}
              renderItem={this.renderItem}
              keyExtractor={polish => polish.pID}
              initialNumToRender={50}
              removeClippedSubviews
              extraData={this.state}
            />
          </CardSection>

        <CardSection style={footerStyle}>
          <Button onPress={() => this.saveChanges()}>Add Selected Polishes</Button>
          <Button onPress={() => this.onCancelPress()}>Cancel</Button>
        </CardSection>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  titleStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  btnContainerStyle: {
    borderBottomWidth: 0
  },
  headerStyle: {
    height: 50
  },
  footerStyle: {
    height: 50
  },
  searchContainerStyle: {
    flex: 1
  }
});

const mapStateToProps = state => {
  const { uid } = state.auth;
  const { allPolishes, curPolishes, searchTerm, loadingPolish, selectedPolishes } = state.polishes;
  return { uid, allPolishes, curPolishes, searchTerm, loadingPolish, selectedPolishes };
};

export default connect(mapStateToProps, {
  getPolishList, clearEditMode, searchtermChanged, addPolishToList
})(EditListWidget);
