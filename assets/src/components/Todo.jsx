import React, { Component } from 'react';

export default class Todo extends Component {
  render() {
    return (
      <li
        onClick={this.props.onClick}
        style={{
          textDecoration: this.props.completed ? 'line-through' : 'none',
          cursor: this.props.completed ? 'default' : 'pointer'
        }}>
        {this.props.label}
        <span onClick={e => {e.stopPropagation(); this.props.onClickDelete()}} style={{float: 'right'}}>✘</span>
      </li>
    )
  }
}
