import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../../Components/Layout';

export const ViewRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      <Layout.Basic>
        <Component {...props} />
      </Layout.Basic>
    )} />
  );
};
