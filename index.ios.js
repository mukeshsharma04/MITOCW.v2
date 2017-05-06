import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import App from './dev/ios/components/App';

export default class MITOpenCourseWare extends Component {

  render() {
    return <App />
  }
}
AppRegistry.registerComponent('MITOpenCourseWare', () => MITOpenCourseWare);