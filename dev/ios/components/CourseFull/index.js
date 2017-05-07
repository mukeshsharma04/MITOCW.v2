import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, View, ListView, StyleSheet, Text, Image } from 'react-native';
import HTMLView from 'react-native-htmlview';

class CourseFull extends Component {
  render() {
    console.log(this.props.course)
    return (
      <View style={styles.container}>
        <HTMLView value={ this.props.course.description } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 64
  }
});

export default CourseFull;