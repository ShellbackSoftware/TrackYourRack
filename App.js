import React from 'react';
import { Platform, UIManager } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Router from './src/Router';

export default class App extends React.Component {
constructor() {
  super();
  if (Platform.OS === 'android') {
    // eslint-disable-next-line
    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
       <Provider store={store}>
          <Router />
       </Provider>
    );
  }
}
