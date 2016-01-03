import React from 'react';
import { RouteHandler } from 'react-router';
import SearchGithub from './SearchGithub';
import Header from './Header';

class Main extends React.Component{
  render(){
    return (
      <div className="main-container">
        <Header />

        <div className="container">
          <RouteHandler {...this.props}/>
        </div>
        <nav className="navbar navbar-default" role="navigation">
          <div className="col-sm-7 col-sm-offset-2" style={{marginTop: 15}}>
            <SearchGithub />
          </div>
        </nav>
      </div>
    )
  }
};

export default Main;