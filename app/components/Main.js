import React from 'react';
import { RouteHandler } from 'react-router';
import SearchGithub from './SearchGithub';
import Header from './Header';
import Rebase from 're-base';

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn: props.loggedIn,
      googleUser: props.googleUser,
      email: props.email
    };
  }
  authDataCallback(authData) {
    if (authData) {
      this.setState({
        loggedIn: true,
        googleUser: authData["google"],
        email: authData["google"]["email"]
      });
    } else {

      this.setState({
        loggedIn: false
      });
      console.log('Attempting to authenticate user account');
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
  render(){
    if (!this.state.loggedIn) {
      return (
        <div className="main-container">
          <div className="container">
            <h3>You are not authenticated. <a href="">Login</a></h3>
          </div>
        </div>
      )
    } else {
      return (
        <div className="main-container">
          <Header />
          <h3>{ this.state.email}</h3>
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
Main.propTypes = {
  loggedIn: React.PropTypes.bool,
  googleUser: React.PropTypes.object,
  email: React.PropTypes.string
};

Main.defaultProps = {
  loggedIn: false,
  googleUser: {},
  email: ''
}

Main.contextTypes = {
  router: React.PropTypes.func.isRequired
};


export default Main;