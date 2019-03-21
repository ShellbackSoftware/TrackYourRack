import React from 'react';
import {
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator
  } from 'react-navigation';
import { HeaderMenuButton, EditListButton } from './components/common';
import SideMenu from './components/SideMenu/SideMenu';
import NavigationService from './components/helpers/NavigationService';
import {
  HomeScreen,
  LoginScreen,
  PolishListScreen,
  AuthLoadingScreen,
  ProfileScreen,
  FollowingScreen,
  ChatScreen,
  ScannerScreen
} from './components/screens';

const DrawerNav = createDrawerNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Following: FollowingScreen,
    Chat: ChatScreen,
    Scanner: ScannerScreen,
  },
  {
    contentComponent: SideMenu,
    headerMode: 'none',
    navigationOptions: {
      headerLeft: null
    }
  }
);

const AuthStack = createStackNavigator(
  {
    Auth: AuthLoadingScreen,
    Login: LoginScreen,
    // Register
    // Forgot password
  },
  {
    initialRouteName: 'Auth',
    headerMode: 'none',
    navigationOptions: {
      headerLeft: null,
      headerRight: null
    }
  }
);

const MainStack = createStackNavigator(
  {
    PolishList: PolishListScreen,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerRight: (
        <EditListButton
          onPress={() => console.log('Edit list')}
        />
      ),
    }
  }
);

const RootStack = createStackNavigator(
  {
    loginFlow: {
      screen: AuthStack,
    },
    mainFlow: {
      screen: DrawerNav,
    },
    polishFlow: {
      screen: MainStack,
    },
  },
  {
    initialRouteName: 'loginFlow',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#00BCD6'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerRight: (
        <HeaderMenuButton
        onPress={() => NavigationService.toggleDrawer()}
        />
      ),
    }
  }
);

const AppContainer = createAppContainer(RootStack);

export default class Router extends React.Component {
  render() {
    return (
      <AppContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
      />
    );
  }
}
