import React, { Component } from 'react';
import { connect } from 'react-redux'
import { TouchableHighlight, ActivityIndicator, View, ScrollView, ListView, StyleSheet, Text, Image } from 'react-native';
import HTMLView from 'react-native-htmlview';

import API from '../../api';

class CourseHTMLPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      featureHTML: '<div></div>'
    }
  }

  componentDidMount() {
    API.ParsedFeature(this.props.feature).then(html => {
      this.setState({
        loaded: true,
        featureHTML: html
      })
    });
  }

  render() {
    return (
      <ScrollView style={styles.scroller}>
        <View style={styles.container}>
          <View style={{borderBottomWidth: 2, marginBottom: 20}}>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
          {
            this.state.loaded && <HTMLView addLineBreaks={true} stylesheet={styles} value={ this.state.featureHTML } />
          }
          {
            !this.state.loaded && (
              <View>
                <ActivityIndicator
                  size="large"
                  color="#A31F34"
                />
              </View>
            )
          }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 30,
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
  },
  img: {
    aspectRatio: 1,
    width: "100%",
    borderWidth: 2
  },
});

export default CourseHTMLPage;