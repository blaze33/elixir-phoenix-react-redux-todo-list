import { combineReducers } from 'redux';
import {
  UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS, UPDATE_TODO_FAILURE,
  FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE,
  ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAILURE,
  COMPLETE_TODO,
  SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions';
const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;

    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
      return [].concat(action.todos);

    case ADD_TODO_REQUEST:
      return state;

    case ADD_TODO_SUCCESS:
      console.log(action)
      return [
        ...state,
        action.todo
      ];

    case ADD_TODO_FAILURE:
      console.error('ADD_TODO_FAILURE');
      return state;

    case UPDATE_TODO_REQUEST:
      return state;

    case UPDATE_TODO_SUCCESS:
      return state.map(todo => todo.id === action.todo.id ? action.todo : todo)

    case UPDATE_TODO_FAILURE:
      console.error('UPDATE_TODO_FAILURE');
      return state;

    case COMPLETE_TODO:
      return state.map(todo => todo.id === action.id ? {...todo, completed: true} : todo)

    default:
      return state;
  }
}

function isLoading(state = false, action) {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return true;

    case FETCH_TODOS_SUCCESS:
    case FETCH_TODOS_FAILURE:
      return false;

    default:
      return state;
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos,
  isLoading
});

export default todoApp;