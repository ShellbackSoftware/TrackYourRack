import React from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import CustomListItem from './CustomListItem';
import { Button, CardSection } from './common';


class CustomListsList extends React.Component {
  scrollToTop() {
    this.flatListRef.scrollToIndex({ animated: true, index: 0 });
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

  renderItem(customList) {
    return <CustomListItem customList={customList} />;
  }

  renderHeader() {
    const customList = {
      item: {
      listID: 0,
      listname: 'View All Polishes',
      uID: this.props.uid
      }
    };
    return <CustomListItem customList={customList} />;
  }

  renderFooter() {
    return <Button onPress={this.props.onPress}>Add New List</Button>;
  }

  render() {
    return (
      <CardSection style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
        <FlatList
          ref={(ref) => { this.flatListRef = ref; }}
          data={this.props.lists}
          renderItem={this.renderItem}
          keyExtractor={customList => customList.listID.toString()}
          ListFooterComponent={this.renderFooter()}
          ListHeaderComponent={this.renderHeader()}
          removeClippedSubviews
          extraData={this.props}
        />
      {this.renderScrollButton()}
      </CardSection>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    position: 'absolute',
    right: 0,
    bottom: 0
  }
});

const mapStateToProps = state => {
  const { uid } = state.auth;
  return { uid, lists: state.lists.userLists };
};

export default connect(mapStateToProps, { })(CustomListsList);
