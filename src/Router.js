import React from 'react';
import {
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator
  } from 'react-navigation';
import { CustomHeader, HeaderMenuButton, EditListButton } from './components/common';
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
  }
);

const MainStack = createStackNavigator(
  {
    PolishList: PolishListScreen,
  },
  {
    headerMode: 'none',
  }
);

const RootStack = createStackNavigator(
  {
    loginFlow: {
      screen: AuthStack,
      navigationOptions: {
        headerLeft: null,
        headerRight: null
      }
    },
    mainFlow: {
      screen: DrawerNav,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.routes[navigation.state.index].routeName,
        headerLeft: null,
        headerRight: (
          <HeaderMenuButton
          onPress={() => NavigationService.toggleDrawer()}
          />
        ),
      })
    },
    polishFlow: {
      screen: MainStack,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.routes[navigation.state.index].params.listname,
        headerRight: (
          <EditListButton
          onPress={() => console.log('Edit list')}
          />
        ),
      })
    },
  },
  {
    initialRouteName: 'loginFlow',
    defaultNavigationOptions: {
      header: props => <CustomHeader {...props} />,
      headerMode: 'none',
      headerStyle: {
        backgroundColor: 'transparent'
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff',
      }
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
