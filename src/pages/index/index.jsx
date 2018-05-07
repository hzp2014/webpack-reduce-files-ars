import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Index extends Component {
  render() {
    return (<span>hello index! world</span>);
  }
}

ReactDOM.render(
  <Index />,
  document.querySelector('#react-body')
);