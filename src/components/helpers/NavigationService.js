import { NavigationActions, DrawerActions } from 'react-navigation';
//eslint-disable-next-line
let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

//eslint-disable-next-line
function toggleDrawer(routeName, params) {
  _navigator.dispatch(DrawerActions.toggleDrawer());
}

export default {
  navigate,
  setTopLevelNavigator,
  toggleDrawer,
};
