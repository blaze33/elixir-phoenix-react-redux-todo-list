import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTodo, fetchTodos, addTodo, updateTodo, setVisibilityFilter, VisibilityFilters } from '../actions';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

class App extends Component {
  componentDidMount() {
    let { dispatch } = this.props;

    dispatch(fetchTodos());
  }

  render() {
    // Injected by connect() call:
    const { dispatch, visibleTodos, isLoading, visibilityFilter } = this.props;
    
    return (
      <div>
        <AddTodo
          onAddClick={text =>
            dispatch(addTodo(text))
          } />
        <TodoList
          todos={visibleTodos}
          isLoading={isLoading}
          onTodoClick={todo =>
            dispatch(updateTodo(todo))
          }
          onTodoClickDelete={todo =>
            dispatch(deleteTodo(todo))
          } />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          } />
      </div>
    );
  }
}


function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter,
    isLoading: state.isLoading
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);