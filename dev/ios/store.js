import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise-middleware';

function main(state = {
  test: "100",
  pending: false,
  departments: [],
  departments_mapped: {}
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
     default:
      console.log("Hello world!");
      break;
  }
  return newState;
}


const reducer = combineReducers({ main })
export const store = createStore(reducer,applyMiddleware(promiseMiddleware()));