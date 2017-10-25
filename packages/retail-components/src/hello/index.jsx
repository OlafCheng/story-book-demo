import React from 'react';

import './hello.scss';

const { Component } = React;

export default class Hello extends Component {
  render() {
    const { name } = this.props;
    return (
      <div>
        Hello{` ${name}`}
      </div>
    );
  }
}