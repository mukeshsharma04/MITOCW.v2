import React, { Component } from 'react';
import { connect } from 'react-redux'
import { TouchableHighlight, View, ScrollView, ListView, StyleSheet, Text, Image } from 'react-native';
import HTMLView from 'react-native-htmlview';

class CourseFull extends Component {

  selectCourseFeature() {

  }


  render() {
    console.log("image", `http://${this.props.course.course_image_path}`);
    return (
      <ScrollView style={styles.scroller}>
        <View style={styles.container}>
          <Text>{this.props.course.course_title}</Text>
          <Image style={styles.image} source={{uri: `http://${this.props.course.course_image_path}`}} />
          {
            this.props.course.course_section_and_tlp_urls.map(url => {
              let title = url.split('/').slice(-1)[0];
              title = `${title[0].toUpperCase()}${title.substr(1)}`;
              title = title.replace(/-/gi, ' ');
              return <TouchableHighlight key={url} style={styles.feture_button} onPress={() => this.selectCourseFeature(url)}>
                      <Text style={ styles.text }>{title}</Text>
                    </TouchableHighlight>
            })
          }
          <HTMLView addLineBreaks={false} stylesheet={styles} value={ this.props.course.description } />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
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
  }
});

export default CourseFull;