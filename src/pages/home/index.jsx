import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Home extends Component {
  render() {
    return (<span>hello home!</span>);
  }
}

ReactDOM.render(
  <Home />,
  document.querySelector('#react-body')
);