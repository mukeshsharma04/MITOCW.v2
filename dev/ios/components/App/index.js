import React, { Component } from 'react';
import {
  StyleSheet,
  NavigatorIOS
} from 'react-native';

import CourseContainer from '../DepartmentsList';

export default class App extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={ {
          component: CourseContainer,
          title: 'MIT OpenCourseWare',
        } }
        style={ styles.container }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});