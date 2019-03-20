/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  //TouchableOpacity
  } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  getPolishList,
  clearPolishState,
  finishPolishList
  } from '../../actions';
import { Card, CardSection, Spinner } from '../common';
import PolishListItem from './polish/PolishListItem';

class PolishListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { polishes: [],
      customList: false,
      listid: this.props.navigation.getParam('listID', null)
    };
    if (this.state.listid > 0) {
      this.props.getPolishList(this.state.listid);
    } else {
      this.state = { polishes: this.props.allPolishes };
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

  getListContent() {
    const { allPolishes, curPolishes } = this.props;
    const polishes = _.intersectionBy(allPolishes, curPolishes, 'pID');
    this.setState({ polishes });
  }

  scrollToTop() {
    this.flatListRef.scrollToIndex({ animated: true, index: 0 });
  }

  loadMoreRows() {
    console.log('End reached');
  }

  searchFilterFunction() {
    /*
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.pName.toUpperCase()}
      ${item.pBrand.toUpperCase()}`;
       const textData = text.toUpperCase();

       return itemData.indexOf(textData) > -1;
    });
    this.setState({ polishes: newData });*/
  }

  renderHeader() {
    return (
      <SearchBar
        inputStyle={styles.searchInputStyle}
        containerStyle={styles.searchContainerStyle}
        placeholder="Search For Polish . . ."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
      />
    );
  }

  renderItem(polishList) {
    return <PolishListItem polishItem={polishList.item} />;
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
              data={this.state.polishes}
              renderItem={this.renderItem}
              keyExtractor={polish => polish.pID}
              initialNumToRender={50}
              removeClippedSubviews
              extraData={this.state}
            />

        {this.renderScrollButton()}
          </CardSection>
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
  }
});

const mapStateToProps = state => {
  const { uid, token } = state.auth;
  const { loadingPolish, allPolishes, curPolishes } = state.polishes;
  return { loadingPolish, uid, token, allPolishes, curPolishes };
};

export default connect(mapStateToProps, {
  getPolishList, clearPolishState, finishPolishList
})(PolishListScreen);
