import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, View, ListView, StyleSheet, Text, Image } from 'react-native';

import CourseFull from '../CourseFull';
import CourseItem from '../CourseItem';
import API from '../../api';

class CourseList extends Component {

  constructor(props) {
    super(props);
    this.props.dispatch({
      type: "FETCH_COURSES",
      payload: API.CourseList(this.props.department.department_key)
    });
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  selectCourse(course) {
    this.props.dispatch({
      type: "SELECT_COURSE",
      value: course.course_key
    });
    this.props.navigator.push({
      title: course.course_key,
      component: CourseFull,
      passProps: { course },
    });
  }

  render() {
    const dataSource = this.ds.cloneWithRows(this.props.courses[this.props.department.department_key] || []);
    return <View>
        <ListView contentContainerStyle={styles.list}
          dataSource={dataSource}
          renderRow={(rowData) => CourseItem(rowData, this.selectCourse.bind(this))}
        />
      </View>
  }
}

const styles = StyleSheet.create({
  list: {
  }
});

export default connect(store => {
  return {
    pending: store.main.pending,
    courses: store.main.courses,
  }
})(CourseList);