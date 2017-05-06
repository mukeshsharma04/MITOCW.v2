import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import { Provider } from 'react-redux';

import { store } from '../../store';

import CourseContainer from '../CourseContainer';

export default class App extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([{
        title: 'Row 1',
        text: 'This is my row'
      },
      {
        title: 'Row 1',
        text: 'This is my row'
      }]),
    };
  }

  render() {
    console.log(store);
    return (
      <View style={styles.container}>
        <Provider store={ store }>
          <CourseContainer />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    backgroundColor: '#CCC',
    margin: 5,
    width: 120,
    height: 120
  }
});