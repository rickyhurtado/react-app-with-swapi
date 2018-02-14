import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Views from '../Views';
import { ViewRoute } from '../Lib/Common/Routes';

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
        <Switch>
          <Route exact path="/" component={Views.Home} />
          <ViewRoute exact path="/people" component={Views.People} />
          <ViewRoute exact path="/people/page/:page" component={Views.People} />
          <ViewRoute exact path="/films" component={Views.Films} />
          <ViewRoute exact path="/films/page/:page" component={Views.Films} />
          <ViewRoute exact path="/films/:id" component={Views.Film} />
          <ViewRoute path="*" component={Views.PageNotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
};
