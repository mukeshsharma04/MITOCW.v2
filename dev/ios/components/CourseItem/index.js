import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

function extractSectionText(section) {
  let s = section.split('/').slice(-1)[0].replace(/-/g, ' ');
  return `${s[0].toUpperCase()}${s.substr(1)}`;
}

export default (course, selectCourse) => (

  course.type == 'header' ? <Text style={ styles.header }>{course.text}</Text> :
    (
      <TouchableHighlight onPress={ () => selectCourse(course) }>
        <View style={ styles.container }>
          <View style={ styles.course_detail_wrap }>
            <Text style={ styles.text_detail }>{course.master_course_number}</Text>
            <Text style={ styles.text_detail }>{course.term}</Text>
            <Text style={ styles.text_detail }>{course.year}</Text>
          </View>
          <View style={ styles.text_title_wrap }>
            <Text style={ styles.text_title }>{course.course_title}</Text>
            <View style={ styles.chip_wrap }>
              {
                course.course_section_and_tlp_urls.map(section => <Text style={ styles.chip } key={ section }>{ extractSectionText(section) }</Text>)
              }
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
)

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#A31F34",
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
    fontSize: 20
  },
  text_title: {
    padding: 2,
    fontSize: 15,
  },
  text_title_wrap: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  text_detail: {
    fontWeight: "bold",
    padding: 2,
    fontSize: 15,
  },
  course_detail_wrap: {
    marginRight: 5,
    flex: 0.35,
  },
  chip_wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#C2C0BF',
    alignSelf: 'flex-start',
    padding: 5,
    margin: 1,
    borderRadius: 10
  },
  container: {
    margin: 5,
    padding: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
});
