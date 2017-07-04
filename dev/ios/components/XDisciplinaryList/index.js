import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, View, ListView, StyleSheet, Text, Image, TabBarIOS } from 'react-native';
import Accordion from 'react-native-accordion';

import DepartmentItem from '../DepartmentItem';
import CoursesList from '../CoursesList';

import API from '../../api';

class XDisciplinaryList extends Component {

  constructor(props) {
    super(props);
    this.props.dispatch({
      type: "FETCH_XDISCIPLINARY",
      payload: API.XDisciplinary()
    });
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  selectXDisciplinary(xdiscipline) {
    this.props.dispatch({
      type: "SELECT_DEPARTMENT",
      value: xdiscipline.department_key,
    });
    this.props.navigator.push({
      title: xdiscipline.title,
      component: CoursesList,
      passProps: { xdiscipline, departmentKind: "xdiscipline", nestedURL: false },
    });
  }

  render() {
    const dataSource = this.ds.cloneWithRows(this.props.xdisciplines);
    return (
      <View>
        <ListView
          contentContainerStyle={ styles.list }
          dataSource={ dataSource }
          renderRow={ (rowData) => DepartmentItem(rowData, this.selectXDisciplinary.bind(this)) }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

export default connect(store => {
  return {
    pending: store.main.pending,
    xdisciplines: store.main.xdisciplines,
  }
})(XDisciplinaryList);