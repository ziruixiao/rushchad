import React from 'react';
import { RouteHandler } from 'react-router';
import SearchGithub from './SearchGithub';
import Header from './Header';
import Rebase from 're-base';
import * as firebaseActions from './firebaseActions';
import EditModalView from './EditModalView';

const SESSION_EXPIRE_TIME = 1000 * 60 * 60; // currently set to 1 hour


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
      showEditModal: props.showEditModal,
      activeEditRusheeId:  "-1"
    };
  }
  authDataCallback(authData) {
    if (authData) {
      var emailToCheck = authData["google"]["email"];

      new Firebase("https://rushchad.firebaseio.com/users").orderByChild("email")
        .startAt(emailToCheck)
        .endAt(emailToCheck)
        .once('value', function(snap) {
          if (snap.val() == null) {
            console.log("null found");

            this.linkSessionToFirebase('kill');

          } else {
            console.log('accounts matching email address');
            this.linkSessionToFirebase(emailToCheck, authData["google"]);
          }
        }.bind(this));

    } else {
      this.setState({
        loggedIn: false,
        googleUser: {},
        email: '',
        users: [],
        rusheese: {},
        loggedInUserId: -1,
        showEditModal: false,
        activeEditRusheeId:  "-1",
        openEditModal: () => {

        },
        closeEditModal: () => {

        }
      });
    }
  }
  setupFirebaseConnections() {
    var usersRef = new Firebase('https://rushchad.firebaseio.com/users').orderByChild('access').equalTo('normal');
    usersRef.on('value', function(dataSnapshot) {
      this.setState({
        users: dataSnapshot.val()
      });
    }.bind(this));

    var rusheesRef = new Firebase('https://rushchad.firebaseio.com/rushees').orderByChild('active').equalTo('yes');
    rusheesRef.on('value', function(dataSnapshot) {
      var unsortedRushees = dataSnapshot.val();
      var sortedRushees = [];

      for (var f_rusheeId in unsortedRushees) {
        sortedRushees.push([f_rusheeId, unsortedRushees[f_rusheeId]]);
      }
      var ordering = localStorage.getItem('rusheeOrdering') || 'first_A_Z';
      switch(ordering) {
        case 'first_A_Z':
          sortedRushees.sort(this.compareRusheesFirstAZ);
          break;
        case 'first_Z_A':
          sortedRushees.sort(this.compareRusheesFirstZA);
          break;
        case 'last_A_Z':
          sortedRushees.sort(this.compareRusheesLastAZ);
          break;
        case 'last_Z_A':
          sortedRushees.sort(this.compareRusheesLastZA);
          break;
        case 'lastUpdated_Z_A':
          sortedRushees.sort(this.compareRusheesLastUpdatedZA);
          break;
        case 'popularity_A_Z':
          sortedRushees.sort(this.compareRusheesPopularityAZ);
          break;
        case 'popularity_Z_A':
          sortedRushees.sort(this.compareRusheesPopularityZA);
          break;
        default:
          break;
      }
      this.setState({
        rushees: sortedRushees
      });
    }.bind(this));
  }
  compareRusheesFirstAZ(a, b) {
    if (a[1]["firstName"] < b[1]["firstName"]) { return -1; }
    else if (a[1]["firstName"] > b[1]["firstName"]) { return 1; }
    else {
      if (a[1]["lastName"] < b[1]["lastName"]) { return -1; }
      else if (a[1]["lastName"] > b[1]["lastName"]) { return 1; }
      else { return 0; }
    }
  }
  compareRusheesFirstZA(a, b) {
    if (a[1]["firstName"] < b[1]["firstName"]) { return 1; }
    else if (a[1]["firstName"] > b[1]["firstName"]) { return -1; }
    else {
      if (a[1]["lastName"] < b[1]["lastName"]) { return 1; }
      else if (a[1]["lastName"] > b[1]["lastName"]) { return -1; }
      else { return 0; }
    }
  }
  compareRusheesLastZA(a, b) {
    if (a[1]["lastName"] > b[1]["lastName"]) { return -1; }
    else if (a[1]["lastName"] < b[1]["lastName"]) { return 1; }
    else { return 0; }
  }
  compareRusheesLastAZ(a, b) {
    if (a[1]["lastName"] < b[1]["lastName"]) { return -1; }
    else if (a[1]["lastName"] > b[1]["lastName"]) { return 1; }
    else { return 0; }
  }
  compareRusheesLastUpdatedZA(a, b) {
    if (a[1]["lastUpdated"] > b[1]["lastUpdated"]) { return -1; }
    else if (a[1]["lastUpdated"] < b[1]["lastUpdated"]) { return 1; }
    else { return 0; }
  }
  compareRusheesPopularityZA(a, b) {
    var a_avg = 0;
    var a_count = 0;
    var b_avg = 0;
    var b_count = 0;
    if (a[1]["ratings"]) {
      var a_sum = 0;
      Object.keys(a[1]["ratings"]).map((key) => {
        a_sum += Number(a[1]["ratings"][key]["value"]);
        a_count++;
      });
      a_avg = a_sum/a_count;
    }
    if (b[1]["ratings"]) {
      var b_sum = 0;
      Object.keys(b[1]["ratings"]).map((key) => {
        b_sum += Number(b[1]["ratings"][key]["value"]);
        b_count++;
      });
      b_avg = b_sum/b_count;
    }

    if (a_avg > b_avg) { return -1; }
    else if (a_avg < b_avg) { return 1; }
    else {
      if (a_count > b_count) { return -1; }
      else if (a_count < b_count) { return 1; }
      else { return 0; }
    }
  }
  compareRusheesPopularityAZ(a, b) {
    var a_avg = 0;
    var a_count = 0;
    var b_avg = 0;
    var b_count = 0;
    if (a[1]["ratings"]) {
      var a_sum = 0;
      Object.keys(a[1]["ratings"]).map((key) => {
        a_sum += Number(a[1]["ratings"][key]["value"]);
        a_count++;
      });
      a_avg = a_sum/a_count;
    }
    if (b[1]["ratings"]) {
      var b_sum = 0;
      Object.keys(b[1]["ratings"]).map((key) => {
        b_sum += Number(b[1]["ratings"][key]["value"]);
        b_count++;
      });
      b_avg = b_sum/b_count;
    }

    if (a_avg > b_avg) { return 1; }
    else if (a_avg < b_avg) { return -1; }
    else {
      if (a_count > b_count) { return 1; }
      else if (a_count < b_count) { return -1; }
      else { return 0; }
    }
  }

  init(){
    var storedExpiration = localStorage.getItem('sessionExpiration');
    var storedKey = localStorage.getItem('sessionKey');
    var storedGoogleUser = localStorage.getItem('googleUser');
    var currentTime = Number(Date.now());
    if (storedExpiration && storedKey && storedGoogleUser) {
      if (currentTime - storedExpiration > SESSION_EXPIRE_TIME) {
        this.linkSessionToFirebase('kill');
      } else {
        this.linkSessionToFirebase(storedKey, storedGoogleUser);
      }
    } else {
      this.ref = new Firebase('https://rushchad.firebaseio.com/');
      this.ref.onAuth(this.authDataCallback.bind(this));
    }
  }
  linkSessionToFirebase(sessionKey, googleUser) {

    if (sessionKey == 'kill') {
      this.ref.unauth();
      localStorage.clear();
      this.setState({
        loggedIn: false,
        googleUser: {},
        email: '',
        users: [],
        rusheese: {},
        loggedInUserId: -1,
        showEditModal: false,
        activeEditRusheeId: "-1",
        openEditModal: () => {

        },
        closeEditModal: () => {

        }
      }, function() {
        document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://rushchad.com"

      });


    } else {
      localStorage.setItem('sessionKey', sessionKey);
      var expireTime = Number(Date.now()) + SESSION_EXPIRE_TIME;
      localStorage.setItem('sessionExpiration', expireTime);
      localStorage.setItem('googleUser', googleUser);
      this.setupFirebaseConnections();
      this.setState({
        loggedIn: true,
        googleUser: googleUser,
        email: sessionKey,
        loggedInUserId: 1,
        openEditModal: this.openEditModal.bind(this),
        closeEditModal: this.closeEditModal.bind(this),
        updateFirebaseConnection: this.setupFirebaseConnections.bind(this),
        activeEditRusheeId:  "-1"
      }, function () {

        firebaseActions.updateUserLastActive(this.state.loggedInUserId);
      }.bind(this));
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
  closeEditModal() {
    this.setState({
      showEditModal: false,
      activeEditRusheeId: "-1"
    });
  }
  openEditModal(newActiveId) {
    this.setState({
      showEditModal: true,
      activeEditRusheeId: newActiveId
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
          <Header googleUser={this.state.googleUser} onModalClick={this.openEditModal.bind(this,-1)} />

          <div className="container">
            <RouteHandler {...this.state} />
            <EditModalView loggedInUserId={this.state.loggedInUserId} showEditModal={this.state.showEditModal} activeEditRusheeId={this.state.activeEditRusheeId} rushees={this.state.rushees} closeAction={this.closeEditModal.bind(this)} />
          </div>
          <br />
          <br />
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
  showEditModal: React.PropTypes.bool,
  activeEditRusheeId: React.PropTypes.string,
  openEditModal: React.PropTypes.func,
  closeEditModal: React.PropTypes.func,
  updateFirebaseConnection: React.PropTypes.func
};

Main.defaultProps = {
  loggedIn: false,
  googleUser: {},
  email: '',
  users: [],
  rushees: {},
  loggedInUserId: -1,
  showEditModal: false,
  activeEditRusheeId:  "-1",
  openEditModal: () => {

  },
  closeEditModal: () => {

  },
  updateFirebaseConnection: () => {

  }
}

Main.contextTypes = {
  router: React.PropTypes.func.isRequired
};


export default Main;