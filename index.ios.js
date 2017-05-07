import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import { store } from './dev/ios/store';

import App from './dev/ios/components/App';

export default class MITOpenCourseWare extends Component {
  render() {
    return (
    <Provider store={store}>
      <App />
    </Provider>
    );
  }
}
AppRegistry.registerComponent('MITOpenCourseWare', () => MITOpenCourseWare);