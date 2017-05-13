import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, ListView, TextInput, StyleSheet } from 'react-native';

import CourseFull from '../CourseFull';
import CourseItem from '../CourseItem';
import CourseMediaItem from '../CourseMediaItem';
import API from '../../api';

export default class CourseMediaList extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  render() {
    const dataSource = this.ds.cloneWithRows(this.props.media_resources);
    return (
      <View style={styles.container}>
        <ListView contentContainerStyle={styles.list}
          automaticallyAdjustContentInsets={false}
          dataSource={dataSource}
          renderRow={(rowData) => CourseMediaItem(rowData)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 64,
  },
  list: {
  }
});