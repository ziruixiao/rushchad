import React from 'react';
import { RouteHandler } from 'react-router';
import SearchGithub from './SearchGithub';
import Header from './Header';
import Rebase from 're-base';

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn : false,
      name: 'Guest'
    };
  }
  init(){
    console.log('Init called');

    this.ref = new Firebase('https://rushchad.firebaseio.com/');
    var currentAuthData = this.ref.getAuth();
    if (currentAuthData) {
      console.log('User is already logged in with payload::', currentAuthData);
      this.setState({
        loggedIn: true
      });
    } else {
      // TODO: Page needs to be killed until state set
      this.setState({
        loggedIn: false
      });
      console.log('Attempting to authenticate user account');
      this.ref.authWithOAuthPopup('google', function (error, authData) {
        if (error) {
          console.log('Login Failed!', error)
        } else {
          console.log('Authenticated successfully with payload:', authData)
          this.setState({
            loggedIn: true
          });
        }
      });
    }

  }
  componentWillMount(){
    this.router = this.context.router;
  }
  componentDidMount(){
    this.init();
  }
  componentWillUnmount(){
  }
  componentWillReceiveProps(){
    this.init();
  }
  render(){
    if (!this.state.loggedIn) {
      return (
        <div className="main-container">
          <Header />

          <div className="container">

            <h1>You are not authenticated.</h1>
          </div>
          <nav className="navbar navbar-default" role="navigation">
            <div className="col-sm-7 col-sm-offset-2" style={{marginTop: 15}}>
              <SearchGithub />
            </div>
          </nav>
        </div>
      )
    } else {
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
  }
};

Main.contextTypes = {
  router: React.PropTypes.func.isRequired
};


export default Main;