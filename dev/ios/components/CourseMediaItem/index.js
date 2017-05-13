import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, View, ScrollView, ListView, StyleSheet, Text, Image } from 'react-native';

export default function(mediaResource) {
  return (
    <ScrollView style={styles.scroller}>
      <View style={styles.container}>
        <Text style={styles.title}>{mediaResource.title}</Text>
        <Image style={styles.image} source={{uri: `http://img.youtube.com/vi/${mediaResource.YouTube.youtube_id}/hqdefault.jpg`}} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  space: {
    height: 15,
  },
  term: {
    marginBottom: 10,
    fontSize: 20
  },
  scroller: {
    backgroundColor: '#C2C0BF',
  },
  feature_button: {
    justifyContent: "flex-start",
  },
  container: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: 'white',
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    borderWidth: 2
  },
  a: {
    color: '#A31F34',
    fontWeight: 'bold'
  }
});