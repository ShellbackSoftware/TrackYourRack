import React from 'react';
import {
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator
  } from 'react-navigation';
import {
    CustomHeader,
    HeaderMenuButton,
    EditListButton
  } from './components/common';
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
  ScannerScreen,
  EditListScreen,
  AddPolishScreen,
  AboutScreen,
  RegisterScreen,
  PasswordScreen,
  AddCustomListScreen,
  AddPolishToListScreen
} from './components/screens';

const DrawerNav = createDrawerNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Following: FollowingScreen,
    Chat: ChatScreen,
    Scanner: ScannerScreen,
    About: AboutScreen,
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
    /*Register: RegisterScreen,
    Password: PasswordScreen,*/
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
            onPress={() => NavigationService.navigate('EditList', {
                                  curList: navigation.state.routes[navigation.state.index].params
                                })}
            screen={navigation.state.routes[navigation.state.index].params.listname}
          />
        ),
      })
    },
    EditList: {
      screen: EditListScreen,
      mode: 'modal',
      headerMode: 'none'
    },
    AddPolish: {
      screen: AddPolishScreen,
      mode: 'modal',
      headerMode: 'none'
    },
    Register: {
      screen: RegisterScreen,
      mode: 'modal',
      headerMode: 'none'
    },
    Password: {
      screen: PasswordScreen,
      mode: 'modal',
      headerMode: 'none'
    },
    AddCustomList: {
      screen: AddCustomListScreen,
      mode: 'modal',
      headerMode: 'none'
    },
    AddPolishToList: {
      screen: AddPolishToListScreen,
      mode: 'modal',
      headerMode: 'none'
    },
  },
  {
    initialRouteName: 'loginFlow',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      header: props => <CustomHeader {...props} />,
      headerMode: 'none',
      headerTintColor: '#fff',
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
