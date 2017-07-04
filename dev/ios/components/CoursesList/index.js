import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ActivityIndicator, View, ListView, TextInput, StyleSheet } from 'react-native';

import CourseFull from '../CourseFull';
import CourseItem from '../CourseItem';
import API from '../../api';

class CourseList extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      search: '',
      loaded: false
    };
    console.log("This props", this.props[this.props.departmentKind]);
  }

  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_COURSES",
      payload: API.CourseList(this.props[this.props.departmentKind].department_key, this.props.nestedURL != null ? this.props.nestedURL : true )
        .then(data => {
          this.setState({
            loaded: true
          });
          return data;
        })
    });
  }

  selectCourse(course) {
    this.props.dispatch({
      type: "SELECT_COURSE",
      value: course.course_key
    });
    this.props.navigator.push({
      title: course.course_title,
      component: CourseFull,
      passProps: { course },
    });
  }

  groupedCourses() {
    let rows = [];
    let courses_grouped = {};

    if (!this.props.courses[this.props[this.props.departmentKind].department_key]) return this.ds.cloneWithRows(rows);

    for (let course of this.props.courses[this.props[this.props.departmentKind].department_key]) {
      if (!course.course_title.includes(this.state.search)) continue;
      courses_grouped[course.level] = courses_grouped[course.level] || [];
      courses_grouped[course.level].push(course);
    }

    for (let group of Object.keys(courses_grouped)) {
      rows.push({ type: 'header', text: group }, ...courses_grouped[group]);
    }
    return this.ds.cloneWithRows(rows);
  }

  render() {
    return (
      <View style={ styles.container }>
        {
          this.state.loaded && <TextInput
          style={ { height: 40, padding: 5, borderColor: 'gray', borderWidth: 1 } }
          onChangeText={ search => this.setState({ search }) }
          value={ this.state.search }
          placeholder='Enter here to search courses'
        />
        }
        {
          !this.state.loaded && (
          <View style={ { justifyContent: 'center', height: "100%" } }>
            <ActivityIndicator
              size="large"
              color="#A31F34"
            />
          </View>
        )
        }
        {
          this.state.loaded && <ListView contentContainerStyle={ styles.list }
          automaticallyAdjustContentInsets={ false }
          dataSource={ this.groupedCourses() }
          renderRow={ (rowData) => CourseItem(rowData, this.selectCourse.bind(this)) }
        />
        }
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

export default connect(store => {
  return {
    pending: store.main.pending,
    courses: store.main.courses,
  }
})(CourseList);