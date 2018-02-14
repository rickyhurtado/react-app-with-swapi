import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StarWarsLogo from '../../Assets/Images/Star_Wars_Logo.png';

export default class Basic extends Component {
  render() {
    return (
      <div className="page">
        <main className="container">
          <header className="page-header">
            <Link to="/">
              <img src={StarWarsLogo} className="page-logo" alt="Star Wars Logo" />
            </Link>
          </header>
          {this.props.children}
        </main>
      </div>
    );
  }
};
