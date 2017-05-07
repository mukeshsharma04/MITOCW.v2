import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise-middleware';

function main(state = {
  pending: false,
  departments: [],
  departments_mapped: {},
  courses: {},
}, action) {
  console.log("Reduce", action.type);
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
      for (let dept of action.payload) {
        for (let d of Object.keys(dept)) {
          dept[d].department_key = d;
          newState.departments.push(dept[d]);
          newState.departments_mapped[d] = dept[d];
        }
      }
      break;
    case "FETCH_COURSES_FULFILLED":
      newState.courses = [];
      newState.courses[action.payload.department] = [];
      for (let course of action.payload.courses) {
        for (let c of Object.keys(course)) {
          course[c].course_key = c;
          newState.courses[action.payload.department].push(course[c]);
        }
      }
      break;
     default:
      break;
  }
  return newState;
}


const reducer = combineReducers({ main })
export const store = createStore(reducer,applyMiddleware(promiseMiddleware()));