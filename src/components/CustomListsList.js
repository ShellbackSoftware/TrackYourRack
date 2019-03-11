import React from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import CustomListItem from './CustomListItem';

class CustomListsList extends React.Component {
  renderItem(customList) {
    return <CustomListItem customList={customList} />;
  }

  render() {
    return (
      <FlatList
        data={this.props.lists}
        renderItem={this.renderItem}
        keyExtractor={customList => customList.listId.toString()}
      />
    );
  }
}

const mapStateToProps = state => {
  return { lists: state.lists };
};

export default connect(mapStateToProps, { })(CustomListsList);
