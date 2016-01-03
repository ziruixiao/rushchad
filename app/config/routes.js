import React from 'react';
import Main from '../components/Main';
import HomeView from '../components/HomeView';
import Profile from '../components/Profile';
import { Router, Route, DefaultRoute } from 'react-router';
import ListView from '../components/ListView';

export default (
  <Route name="app" path="/" handler={Main}>
    <Route name="list" path="list" handler={ListView} />
    <Route name="profile" path="profile/:username" handler={Profile} />
    <DefaultRoute handler={HomeView} />
  </Route>
);