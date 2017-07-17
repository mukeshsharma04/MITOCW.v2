import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise-middleware';

function main(state = {
  pending: false,
  departments: [],
  departments_mapped: {},
  xdisciplines: [],
  xdisciplines_mapped: {},
  courses: {},
  courses_grouped: {}
}, action) {
  let newState = Object.assign({}, state);
  switch(action.type) {
  case "SELECT_DEPARTMENT":
    newState.selected_department = action.value;
    break;
  case "FETCH_DEPARTMENTS_PENDING":
    newState.loading_departments = true;
    break;
  case "FETCH_DEPARTMENTS_FULFILLED":
    newState.departments = [];
    newState.departments_mapped = {};
    newState.loading_departments = false;
    for (let dept of action.payload) {
      for (let d of Object.keys(dept)) {
        dept[d].department_key = d;
        newState.departments.push(dept[d]);
        newState.departments_mapped[d] = dept[d];
      }
    }
    newState.departments.sort((a, b) => {
      switch (a.title > b.title) {
      case true:
        return 1;
      case false:
        return -1;
      default:
        return 0;
      }
    });
    break;
  case "FETCH_XDISCIPLINARY_FULFILLED":
    newState.xdisciplines = [];
    newState.xdisciplines_mapped = {};
    for (let disc of action.payload) {
      for (let d of Object.keys(disc)) {
        const key = disc[d].split('/').splice(-2, 1);
        disc[d] = {
          "home_url": disc[d]
        };
        disc[d].department_key = key;
        disc[d].title = d;
        newState.xdisciplines.push(disc[d]);
        newState.xdisciplines_mapped[d] = disc[d];
      }
    }
    break;
  case "FETCH_COURSES_FULFILLED":
    newState.courses = {};
    newState.courses[action.payload.department] = [];
    newState.courses_grouped[action.payload.department] = {};

    for (let course of action.payload.courses) {
      for (let c of Object.keys(course)) {
        course[c].course_key = c;
        newState.courses[action.payload.department].push(course[c]);
      }
    }

    newState.courses[action.payload.department].sort((a, b) => {
      if (a.master_course_number > b.master_course_number) return 1;
      if (a.master_course_number < b.master_course_number) return -1;
      return 0;
    });

    function bucket(values, prop) {
      let bucket = [];
      let container = [];
      let previous = null;
      for (let value of values) {
        if (previous && value[prop] != previous[prop]) {
          bucket.push(container);
          container = [];
          previous = null;
        }
        container.push(value);
        previous = value;
      }
      bucket.push(container);
      return bucket;
    }

    function flatten(arr){
      let len = arr.length;
      for (let i = 0; i < len; i++) {
        let v = arr.shift()
        arr.push(...v);
      }
      return arr;
    }

    let courseList = newState.courses[action.payload.department];

    let courseMasterBucket = bucket(courseList, "master_course_number");

    const season = {
      "Summer": 0,
      "Fall": 1
    };

    for (let b = 0; b < courseMasterBucket.length; b++) {
      courseMasterBucket[b].sort((a, b) => {
        if (a.year < b.year) return 1;
        if (a.year > b.year) return -1;
        return 0;
      });

      courseMasterBucket[b] = bucket(courseMasterBucket[b], "year");

      for (let yb = 0; yb < courseMasterBucket[b].length; yb++) {
        courseMasterBucket[b][yb].sort((a, b) => {
          if (a.term[season] < b.term[season]) return 1;
          if (a.term[season] > b.term[season]) return -1;
          return 0;
        });
      }
    }

    newState.courses[action.payload.department] = flatten(flatten(courseMasterBucket));

    break;
  default:
    break;
  }
  return newState;
}

const reducer = combineReducers({ main })
export const store = createStore(reducer,applyMiddleware(promiseMiddleware()));