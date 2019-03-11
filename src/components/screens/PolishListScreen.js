import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getAllPolishes } from '../../actions';
import { Card, CardSection, Spinner } from '../common';
import PolishListItem from './polish/PolishListItem';

class PolishListScreen extends React.Component {
  componentDidMount() {
    // If specific list, pass list ID
    // If all polishes
    this.props.getAllPolishes();
  }

  renderItem(polishList) {
    return <PolishListItem polishItem={polishList.item} />;
  }

  renderPage() {
    if (this.props.loading) {
      return (
        <Card>
          <CardSection>
            <Text>Loading polishes, please wait . . .</Text>
          </CardSection>
          <CardSection>
            <Spinner size="large" />
          </CardSection>
        </Card>
      );
    }

    return (
      <Card>
        <CardSection>
          <Text>Search bar</Text>
        </CardSection>
        <FlatList
          data={this.props.allPolishes}
          renderItem={this.renderItem}
          keyExtractor={polish => polish.pID}
        />
      </Card>
    );
  }

  render() {
    return (
      <View>
          {this.renderPage()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { uid, token } = state.auth;
  const { loading, allPolishes } = state.polishes;
  return { loading, uid, token, allPolishes };
};

export default connect(mapStateToProps, { getAllPolishes })(PolishListScreen);
