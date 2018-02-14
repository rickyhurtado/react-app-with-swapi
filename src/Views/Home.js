import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import StarWarsLogo from '../Assets/Images/Star_Wars_Logo.png';
import { PageTitle } from '../Lib/Common/Views';

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <header className="home-page-header">
          <img src={StarWarsLogo} className="home-page-logo" alt="StarWars Logo" />
          <PageTitle title="React App with SWAPI" />
        </header>
        <nav>
          <Link to="/people" className="nav-button">People</Link>
          <Link to="/films" className="nav-button">Films</Link>
        </nav>
      </div>
    );
  }
};

export default withRouter(Home);
