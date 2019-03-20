/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
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
      console.log(`List ID:${this.state.listid}`);
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
    console.log(`Cur polishes: ${curPolishes.length}`);
    const polishes = _.intersectionBy(allPolishes, curPolishes, 'pID');
    this.setState({ polishes });
  }

  scrollToTop() {
    console.log('Scroll');
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
      <TouchableOpacity onPress={this.scrollToTop.bind(this)}>
        <Icon
          raised
          name='angle-double-up'
          type='font-awesome'
          style={styles.buttonStyle}
        />
      </TouchableOpacity>
    );
  }

  renderPage() {
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
        <View
        style={styles.containerStyle}
        >
        <CardSection>
        <FlatList
          data={this.state.polishes}
          renderItem={this.renderItem}
          keyExtractor={polish => polish.pID}
          initialNumToRender={50}
          removeClippedSubviews
          ListHeaderComponent={this.renderHeader}
          extraData={this.state}
        />
        </CardSection>
      </View>
    );
  }

  render() {
    return (
      <Card>
          {this.renderPage()}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
      justifyContent: 'flex-end',
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#007AFF',
      marginLeft: 5,
      marginRight: 5
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
