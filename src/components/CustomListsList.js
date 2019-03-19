import React from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import CustomListItem from './CustomListItem';
import { Button } from './common';


class CustomListsList extends React.Component {
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
    return <Button>Add New List</Button>;
  }

  render() {
    return (
        <FlatList
          data={this.props.lists}
          renderItem={this.renderItem}
          keyExtractor={customList => customList.listID.toString()}
          style={styles.containerStyle}
          ListFooterComponent={this.renderFooter()}
          ListHeaderComponent={this.renderHeader()}
        />
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column'
  }
});

const mapStateToProps = state => {
  const { uid } = state.auth;
  return { uid, lists: state.lists.userLists };
};

export default connect(mapStateToProps, { })(CustomListsList);
