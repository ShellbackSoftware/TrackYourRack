import React from 'react';
import { connect } from 'react-redux';
import NavigationService from '../helpers/NavigationService';
import { SideMenuItem } from './SideMenuItem';
import { Card } from '../common';
import { logoutUser } from '../../actions';

class SideMenu extends React.Component {
  onItemSelect(route) {
    NavigationService.navigate(route);
  }

  logout() {
    this.props.logoutUser(this.props.token);
  }

  render() {
    return (
      <Card>
        <SideMenuItem
        onPress={() => this.onItemSelect('Home')}
        >
          Home
        </SideMenuItem>

        <SideMenuItem
          onPress={() => this.onItemSelect('Profile')}
        >
          Profile
        </SideMenuItem>

        <SideMenuItem
          onPress={() => this.onItemSelect('Following')}
        >
          People I Follow
        </SideMenuItem>

        <SideMenuItem
          onPress={() => this.onItemSelect('Chat')}
        >
          Chat
        </SideMenuItem>

        {/*<SideMenuItem
          onPress={() => this.onItemSelect('Scanner')}
        >
          Barcode Scanner
        </SideMenuItem>*/}

        <SideMenuItem
          onPress={() => this.onItemSelect('About')}
        >
          About
        </SideMenuItem>

        <SideMenuItem
          onPress={() => this.logout()}
        >
          Log Out
        </SideMenuItem>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { token } = state.auth;
  return { token };
};

export default connect(mapStateToProps, { logoutUser })(SideMenu);
