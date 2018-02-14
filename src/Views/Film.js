import React, { Component } from 'react';
import DataListItem from '../Components/DataListItem';

export default class Film extends Component {
  render() {
    return (
      <DataListItem
        title="Films"
        attribute="Characters"
        recordId={this.props.match ? this.props.match.params.id : null}
      />
    );
  }
};
