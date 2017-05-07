import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

export default (course, selectCourse) => (
  <TouchableHighlight style={styles.container} onPress={() => selectCourse(course)}>
    <Text style={ styles.text }>{course.course_key}</Text>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  text: {
    color: "white",
    backgroundColor: "#A31F34",
    fontWeight: "bold",
    padding: 2,
    width: "100%",
    fontSize: 15
  },
  container: {
    margin: 5,
  },
});
