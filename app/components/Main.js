import React from 'react';
import { RouteHandler } from 'react-router';
import SearchGithub from './SearchGithub';
import Header from './Header';
import Rebase from 're-base';
import * as firebaseActions from './firebaseActions';

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn: props.loggedIn,
      googleUser: props.googleUser,
      email: props.email,
      users: props.users,
      rushees: props.rushees
    };
  }
  authDataCallback(authData) {
    if (authData) {
      if (authData["google"]["email"] != "ziruixiao@gmail.com") {
        console.log("unauth");
        this.ref.unauth();
        this.setState({
          loggedIn: false,
          googleUser: {},
          email: '',
          users: [],
          rushees: {}
        });
        document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://rushchad.com"

      } else { // successful login*/
        this.setupFirebaseConnections();
        this.setState({
          loggedIn: true,
          googleUser: authData["google"],
          email: authData["google"]["email"]
        });
      }
    } else {
      this.setState({
        loggedIn: false,
        googleUser: {},
        email: '',
        users: [],
        rusheese: {}
      });
    }
  }
  setupFirebaseConnections() {
    var usersRef = new Firebase('https://rushchad.firebaseio.com/users');
    usersRef.once('value', function(dataSnapshot) {
      this.setState({
        users: dataSnapshot.val()
      });
    }.bind(this));

    var rusheesRef = new Firebase('https://rushchad.firebaseio.com/rushees');
    rusheesRef.once('value', function(dataSnapshot) {
      this.setState({
        rushees: dataSnapshot.val()
      });
    }.bind(this));
  }
  init(){
    this.ref = new Firebase('https://rushchad.firebaseio.com/');
    this.ref.onAuth(this.authDataCallback.bind(this));
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
  login() {
    console.log('Attempting to authenticate user account');
    this.ref = new Firebase('https://rushchad.firebaseio.com/');
    this.ref.authWithOAuthPopup('google', function (error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully');
      }
    }, {
      scope: "email"
    });
  }
  render(){
    if (!this.state.loggedIn) {
      return (
        <div className="main-container">
          <div className="container">
            <h3>You must log in to view this site. </h3>
            <button onClick={this.login.bind(this)}>Login</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="main-container">
          <Header googleUser={this.state.googleUser}/>

          <div className="container">

            <RouteHandler {...this.state} users={this.state.users} rushees={this.state.rushees}/>
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


Main.propTypes = {
  loggedIn: React.PropTypes.bool,
  googleUser: React.PropTypes.object,
  email: React.PropTypes.string,
  users: React.PropTypes.array,
  rushees: React.PropTypes.object
};

Main.defaultProps = {
  loggedIn: false,
  googleUser: {},
  email: '',
  users: [],
  rushees: {}
}

Main.contextTypes = {
  router: React.PropTypes.func.isRequired
};


export default Main;