import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, View, ListView, StyleSheet, Text } from 'react-native';

import DepartmentsList from '../DepartmentsList';
import XDisciplinaryList from '../XDisciplinaryList';

export default class ListSelector extends Component {

  constructor(props) {
    super(props);
  }

  selectViewDepartments() {
    this.props.navigator.push({
      title: "All Departments",
      component: DepartmentsList,
    });
  }

  selectViewXDisciplines() {
    this.props.navigator.push({
      title: "Cross-Disciplinary",
      component: XDisciplinaryList,
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.center }>Welcome to MIT OCW!</Text>
        <Text style={ styles.centerWithMargin }>Select a list to get started</Text>
        <Button
          color={ '#A31F34' }
          title={ "All Departments" }
          style={ styles.center }
          onPress={ () => this.selectViewDepartments() } />
        <Button
          color={ '#A31F34' }
          title={ "Cross-Disciplinary" }
          style={ styles.center }
          onPress={ () => this.selectViewXDisciplines() } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "flex-start",
    textAlign: "center"
  },
  centerWithMargin: {
    justifyContent: "flex-start",
    textAlign: "center",
    marginBottom: 30
  },
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
  }
});