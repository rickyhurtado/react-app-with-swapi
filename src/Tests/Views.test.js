import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Views from '../Views';

test('StarWars Views.Home is rendered', () => {
  const component = renderer.create(
    <BrowserRouter>
      <Route>
        <Views.Home />
      </Route>
    </BrowserRouter>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('StarWars Views.People is rendered', () => {
  const component = renderer.create(
    <Views.People />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('StarWars Views.Film is rendered', () => {
  const component = renderer.create(
    <Views.Film />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('StarWars Views.Films is rendered', () => {
  const component = renderer.create(
    <Views.Films />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('StarWars Views.PageNotFound is rendered', () => {
  const component = renderer.create(
    <BrowserRouter>
      <Route>
        <Views.PageNotFound />
      </Route>
    </BrowserRouter>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
