import React, { Component } from 'react';
import Todo from './Todo';

export default class TodoList extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <p><em>Loading ...</em></p>
      );
    }

    return (
      <ul>
        {this.props.todos.map((todo, index) =>
          <Todo {...todo}
                key={index}
                onClickDelete={() => this.props.onTodoClickDelete(todo)}
                onClick={() => this.props.onTodoClick(todo)} />
        )}
      </ul>
    );
  }
}
