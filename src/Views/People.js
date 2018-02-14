import React, { Component } from 'react';
import DataList from '../Components/DataList';

export default class People extends Component {
  render() {
    return (
      <DataList
        title="People"
        displayLink={false}
        currentPage={this.props.match ? this.props.match.params.page : 1}
        {...this.props}
      />
    );
  }
};
