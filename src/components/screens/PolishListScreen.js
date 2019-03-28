/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet
  } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  getPolishList,
  clearPolishState,
  finishPolishList,
  searchtermChanged,
  openModal,
  closeModal,
  removePolishFromList,
  clearEditMode
  } from '../../actions';
import { Card, CardSection, Spinner, Button } from '../common';
import PolishListItem from './polish/PolishListItem';

class PolishListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polishes: [],
      tempPolishes: [],
      customList: false,
      listid: this.props.navigation.getParam('listID'),
      listname: this.props.navigation.getParam('listname')
    };
    if (this.state.listid > 0) {
      this.props.getPolishList(this.state.listid);
    } else {
      this.state = { polishes: this.props.allPolishes, tempPolishes: this.props.allPolishes };
    }
   }

  componentDidMount() {
    if (this.state.listid > 0) {
      this.setState({ customList: true });
    } else {
      this.props.finishPolishList();
    }
  }

  componentDidUpdate(prevProps) {
    if ((this.props.curPolishes !== prevProps.curPolishes) && (this.state.listid > 0)) {
      this.getListContent();
    }
  }

  componentWillUnmount() {
    this.props.clearPolishState();
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

  onRemovePress() {
    const uid = this.props.uid;
    const listid = this.state.listid;
    // eslint-disable-next-line
    this.props.selectedPolishes.map((p) => {
      this.props.removePolishFromList(uid, listid, p, this.state.listname);
    });
    this.props.clearEditMode();
  }

  getListContent() {
    const { allPolishes, curPolishes } = this.props;
    const polishes = _.intersectionBy(allPolishes, curPolishes, 'pID');
    this.setState({ polishes, tempPolishes: polishes });
  }

  willFocus = this.props.navigation.addListener('willFocus', () => {
    this.props.clearEditMode();
      if (this.state.listid > 0) {
        this.props.getPolishList(this.state.listid);
      }
    }
  );

  toggleModal() {
    if (this.props.showModal) {
      this.props.closeModal();
    } else {
      this.props.openModal();
    }
  }

  scrollToTop() {
    this.flatListRef.scrollToIndex({ animated: true, index: 0 });
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

  renderFooter() {
    if (this.props.editMode) {
      return (
      <CardSection style={styles.footerStyle}>
        <Button style={{ flex: 1 }} onPress={this.onRemovePress.bind(this)}>
          Remove Selected Polishes
        </Button>
      </CardSection>
      );
    }
  }

  renderScrollButton() {
    return (
        <Icon
          raised
          name='angle-double-up'
          type='font-awesome'
          containerStyle={styles.buttonStyle}
          onPress={this.scrollToTop.bind(this)}
          underlayColor={'#00BCD6'}
          color='#00BCD6'
        />
    );
  }

  render() {
    if (this.props.loadingPolish) {
      return (
        <View>
          <CardSection>
            <Text>Loading polishes, please wait . . .</Text>
          </CardSection>

          <CardSection>
            <Spinner size="large" />
          </CardSection>
        </View>
      );
    }

    return (
        <Card style={{ flex: 1 }}>
          <CardSection>
            {this.renderHeader()}
          </CardSection>

          <CardSection style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
            <FlatList
              ref={(ref) => { this.flatListRef = ref; }}
              data={this.state.tempPolishes}
              renderItem={this.renderItem}
              keyExtractor={polish => polish.pID}
              initialNumToRender={50}
              removeClippedSubviews
              extraData={this.state}
            />

        {this.renderScrollButton()}
          </CardSection>
          {this.renderFooter()}
        </Card>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  buttonStyle: {
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  searchInputStyle: {

  },
  searchContainerStyle: {
    flex: 1
  },
  footerStyle: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  const { uid, token } = state.auth;
  const { loadingPolish, allPolishes, curPolishes,
    searchTerm, editMode, selectedPolishes } = state.polishes;
  const { showModal } = state.lists;
  return { loadingPolish,
    uid,
    token,
    allPolishes,
    curPolishes,
    searchTerm,
    showModal,
    editMode,
    selectedPolishes
  };
};

export default connect(mapStateToProps, {
  getPolishList,
  clearPolishState,
  finishPolishList,
  searchtermChanged,
  openModal,
  closeModal,
  removePolishFromList,
  clearEditMode
})(PolishListScreen);
