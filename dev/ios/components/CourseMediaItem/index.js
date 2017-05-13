import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';

export default (mediaItem) => (
  <TouchableHighlight onPress={() => null}>
    <View style={styles.container}>
    </View>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  text: {
    color: "white",
    backgroundColor: "#A31F34",
    fontWeight: "bold",
    padding: 2,
    width: "100%",
    textAlign: "center",
    fontSize: 15
  },
  backdrop_container: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  container: {
    margin: 5,
    width: 145,
    height: 145,
  },
  backdrop: {
    width: 145,
    height: 145,
    justifyContent: 'flex-end',
  }
});
