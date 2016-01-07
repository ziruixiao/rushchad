import React from 'react';
import { RouteHandler } from 'react-router';
import SearchGithub from './SearchGithub';
import Header from './Header';
import Rebase from 're-base';
import * as firebaseActions from './firebaseActions';
import EditModalView from './EditModalView';

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn: props.loggedIn,
      googleUser: props.googleUser,
      email: props.email,
      users: props.users,
      rushees: props.rushees,
      loggedInUserId: props.loggedInUserId,
      showEditModal: props.showEditModal
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
          rushees: {},
          loggedInUserId: -1,
          showEditModal: false
        });
        document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://rushchad.com"

      } else { // successful login*/
        this.setupFirebaseConnections();
        this.setState({
          loggedIn: true,
          googleUser: authData["google"],
          email: authData["google"]["email"],
          loggedInUserId: 1
        });
      }
    } else {
      this.setState({
        loggedIn: false,
        googleUser: {},
        email: '',
        users: [],
        rusheese: {},
        loggedInUserId: -1,
        showEditModal: false
      });
    }
  }
  setupFirebaseConnections() {
    var usersRef = new Firebase('https://rushchad.firebaseio.com/users').orderByChild('access').equalTo('normal');
    usersRef.once('value', function(dataSnapshot) {
      this.setState({
        users: dataSnapshot.val()
      });
    }.bind(this));

    var rusheesRef = new Firebase('https://rushchad.firebaseio.com/rushees').orderByChild('active').equalTo('yes');
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
  closeEditModal() {
    this.setState({
      showEditModal: false
    });
  }
  openEditModal() {
    console.log('modal should be open');
    this.setState({
      showEditModal: true
    });
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
          <Header googleUser={this.state.googleUser} onModalClick={this.openEditModal.bind(this)} />

          <div className="container">
            <RouteHandler {...this.state}/>
            <EditModalView showEditModal={this.state.showEditModal} closeAction={this.closeEditModal.bind(this)} />
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
  rushees: React.PropTypes.object,
  loggedInUserId: React.PropTypes.number,
  showEditModal: React.PropTypes.bool
};

Main.defaultProps = {
  loggedIn: false,
  googleUser: {},
  email: '',
  users: [],
  rushees: {},
  loggedInUserId: -1,
  showEditModal: false
}

Main.contextTypes = {
  router: React.PropTypes.func.isRequired
};


export default Main;