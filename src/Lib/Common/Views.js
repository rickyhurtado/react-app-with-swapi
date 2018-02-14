import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export const PageTitle = ({ ...props }) => {
  let siteName = process.env.REACT_APP_SITE_NAME;
  let { title, customTitle, parent } = props;

  if (parent) {
    siteName = `${parent} | ${siteName}`;
  }

  let headTitle = customTitle ? title : `${title} | ${siteName}`;

  if (!title) {
    title = siteName;
    headTitle = siteName;
  }

  return (
    <h1 className="page-title">
      <Helmet title={headTitle} />
      {title}
    </h1>
  );
};

export const Navigations = ({...props}) => {
  return (
    <nav>
      <Link to="/" className="nav-button">Home</Link>
      <Link to={`/${props.resources}`} className="nav-button">{props.title}</Link>
    </nav>
  );
};
