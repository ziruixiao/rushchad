import React from 'react';
import Main from '../components/Main';
import HomeView from '../components/HomeView';
import ProfileView from '../components/ProfileView';
import { Router, Route, DefaultRoute } from 'react-router';
import ListView from '../components/ListView';
import DetailView from '../components/DetailView';

export default (
  <Route name="app" path="/" handler={Main}>
    <Route name="list" path="list" handler={ListView} />
    <Route name="profile" path="profile/:username" handler={ProfileView} />
    <Route name="detail" path="detail/:rusheeId" handler={DetailView} />
    <DefaultRoute handler={HomeView} />
  </Route>
);