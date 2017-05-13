import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, View, ScrollView, ListView, StyleSheet, Text, Image } from 'react-native';
import HTMLView from 'react-native-htmlview';


import CourseHTMLPage from '../CourseHTMLPage';
import CourseMediaList from '../CourseMediaList';

class CourseFull extends Component {

  featureHasMediaResources(feature) {

    let media_resources = [];

    for (let r of this.props.course.media_resources) {
      for (let k of Object.keys(r)) {
        if (r[k].path.includes(feature)) {
          r[k].title = k;
          media_resources.push(r[k]);
        }
      }
    }
    return media_resources;
  }

  selectCourseFeature(url) {
    const urlSlugs = url.split('/');
    const lastSlug = urlSlugs[urlSlugs.length-1];
    let media_resources = this.featureHasMediaResources(lastSlug);

    let title = `${lastSlug[0].toUpperCase()}${lastSlug.substr(1)}`.replace(/-|_/gi, ' ');

    let featureComponent;

    if (media_resources.length) {
      featureComponent = CourseMediaList;
    } else {
      featureComponent = CourseHTMLPage;
    }

    this.props.navigator.push({
      title: `${this.props.course.course_title}`,
      component: featureComponent,
      passProps: {
        course: this.props.course,
        title,
        feature: url,
        media_resources
      },
    });
  }


  render() {
    return (
      <ScrollView style={styles.scroller}>
        <View style={styles.container}>
          <Text style={styles.title}>({this.props.course.master_course_number}) {this.props.course.course_title}</Text>
          <Image style={styles.image} source={{uri: `http://${this.props.course.course_image_path}`}} />
          <Text style={styles.term}>{this.props.course.term} {this.props.course.year}</Text>
          {
            this.props.course.course_section_and_tlp_urls.map(url => {
              let title = url.split('/').slice(-1)[0];
              title = `${title[0].toUpperCase()}${title.substr(1)}`.replace(/-|_/gi, ' ');
              return <Button color={'#A31F34'} title={title} key={url} style={styles.feture_button} onPress={() => this.selectCourseFeature(url)} />
            })
          }
          <View style={styles.space}></View>
          <HTMLView addLineBreaks={false} stylesheet={styles} value={ this.props.course.description } />
        </View>
      </ScrollView>
    )
  }
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

export default CourseFull;