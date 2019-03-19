/* eslint-disable no-underscore-dangle, no-param-reassign */
import _ from 'lodash';
import React from 'react';
import { FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
  } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getAllPolishes, getPolishList } from '../../actions';
import { Card, CardSection, Spinner } from '../common';
import PolishListItem from './polish/PolishListItem';

class PolishListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { polishes: [],
      customList: false,
      listid: this.props.navigation.getParam('listID', null)
    };
    this.props.getAllPolishes();
    this.props.getPolishList(this.state.listid);
  }

  componentDidMount() {
    if (this.state.listid > 0) {
      this.setState({ customList: true });
      this.getListContent();
    }
  }

 getListContent() {
    const { allPolishes, curPolishes } = this.props;
    const polishes = _.intersectionBy(allPolishes, curPolishes, 'pID');
    this.setState({ polishes });
  }

  scrollToTop() {
    console.log('Scroll');
  }

  loadMoreRows() {
    console.log('End reached');
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
          <Text style={{ flex: 1 }}>Search bar</Text>
        </CardSection>
        <CardSection>
          {this.renderList()}
        </CardSection>
      </View>
    );
  }

  renderList() {
    if (this.state.customList) {
      return (
        <FlatList
          data={this.state.polishes}
          renderItem={this.renderItem}
          keyExtractor={polish => polish.pID}
          initialNumToRender={50}
          removeClippedSubviews
        />
      );
    }
    return (
      <FlatList
        data={this.props.allPolishes}
        renderItem={this.renderItem}
        keyExtractor={polish => polish.pID}
        initialNumToRender={50}
        removeClippedSubviews
      />
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

export default connect(mapStateToProps, { getAllPolishes, getPolishList })(PolishListScreen);
