import React from 'react';

// const { Component } = React;

export default class Hello extends React.Component {
  render() {
    const { name } = this.props;

    return (
      <div>
        hello{` ${name}!`}
      </div>
    );
  }
}