import { configureChannel } from './channel';

let channel = configureChannel();
console.log(channel)

/*
 * action types
 */

export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';

export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';

export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action creators
 */

function fetchTodosRequest() {
  return { type: FETCH_TODOS_REQUEST };
}

function fetchTodosSuccess(todos) {
  return { type: FETCH_TODOS_SUCCESS, todos };
}

function fetchTodosFailure(error) {
  return { type: FETCH_TODOS_FAILURE, error };
}

function addTodoRequest(text) {
  return { type: ADD_TODO_REQUEST, text };
}

function addTodoSuccess(todo) {
  return { type: ADD_TODO_SUCCESS, todo };
}

function addTodoFailure(text, error) {
  return { type: ADD_TODO_FAILURE, text, error };
}

function updateTodoRequest(label, completed) {
  return { type: UPDATE_TODO_REQUEST, label, completed };
}

function updateTodoSuccess(todo) {
  return { type: UPDATE_TODO_SUCCESS, todo };
}

function updateTodoFailure(label, completed, error) {
  return { type: UPDATE_TODO_FAILURE, label, completed, error };
}

function deleteTodoSuccess(todo) {
  return { type: DELETE_TODO_SUCCESS, todo };
}

export function addTodo(text) {
  return dispatch => {
    dispatch(addTodoRequest(text));

    let payload = {
      label: text,
      completed: false
    };

    channel.push('new:todo', payload)
      .receive('ok', response => {
        console.log('created TODO', response);
      })
      .receive('error', error => {
        console.error(error);
        dispatch(addTodoFailure(text, error));
      });
  };
}

export function fetchTodos() {
  return dispatch => {
    dispatch(fetchTodosRequest());

    channel.join()
      .receive('ok', messages => {
        console.log('catching up', messages);
        dispatch(fetchTodosSuccess(messages.todos.data));
      })
      .receive('error', reason => {
        console.log('failed join', reason);
        dispatch(fetchTodosFailure(reason));
      })
    //.after(10000, () => console.log('Networking issue. Still waiting...'));

    channel.on('new:todo', todo => {
      console.log('new:todo', todo);
      dispatch(addTodoSuccess(todo));
    });

    channel.on('update:todo', todo => {
      console.log('update:todo', todo);
      dispatch(updateTodoSuccess(todo));
    });

    channel.on('delete:todo', todo => {
      console.log('delete:todo', todo);
      dispatch(deleteTodoSuccess(todo));
    });
  };
}

export function updateTodo(todo) {
  return dispatch => {
    dispatch(updateTodoRequest());

    const payload = {
      ...todo,
      completed: todo.completed ? false : true
    }

    channel.push('update:todo', payload)
      .receive('ok', response => {
        console.log('updated TODO', response);
      })
      .receive('error', error => {
        console.error(error);
        dispatch(updateTodoFailure(todo, error));
      });
  }
}


export function deleteTodo(todo) {
  return dispatch => {

    const payload = { id: todo.id}

    channel.push('delete:todo', payload)
      .receive('ok', response => {
        console.log('deleted TODO', response);
      })
      .receive('error', error => {
        console.error(error);
      });
  }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
