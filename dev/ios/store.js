import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise-middleware';

function main(state = {
  test: "100"
}, action) {
  switch(action.type) {
     default:
      console.log("Hello world!");
  }
  return state;
}


const reducer = combineReducers({ main })
export const store = createStore(reducer,applyMiddleware(promiseMiddleware));