import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, View, ListView, StyleSheet, Text, Image, TabBarIOS } from 'react-native';

import DepartmentItem from '../DepartmentItem';
import CoursesList from '../CoursesList';

import API from '../../api';

class CourseContainer extends Component {

  constructor(props) {
    super(props);
    this.props.dispatch({
      type: "FETCH_DEPARTMENTS",
      payload: API.Departments()
    });
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  selectDepartment(department) {
    this.props.dispatch({
      type: "SELECT_DEPARTMENT",
      value: department.department_key
    });
    this.props.navigator.push({
      title: department.title,
      component: CoursesList,
      passProps: { department },
    });
  }

  render() {
    const dataSource = this.ds.cloneWithRows(this.props.departments);
    return (
      <View>
        <Accordion
          header={ <Text>Hello there</Text> }
          content={ (
            <ListView contentContainerStyle={ styles.list }
              dataSource={ dataSource }
              renderRow={ (rowData) => DepartmentItem(rowData, this.selectDepartment.bind(this)) }
            />
          ) }
          easing="easeOutCubic"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default connect(store => {
  return {
    pending: store.main.pending,
    departments: store.main.departments,
  }
})(CourseContainer);