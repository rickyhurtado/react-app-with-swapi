import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PageTitle } from '../Lib/Common/Views';

export default class PageNotFound extends Component {
  render() {
    return (
      <div className="page-not-found-page">
        <PageTitle title="404" />
        <nav>
          <Link to="/" className="nav-button single">Home</Link>
        </nav>
      </div>
    );
  }
};
