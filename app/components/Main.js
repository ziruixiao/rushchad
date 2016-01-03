import React from 'react';
import { RouteHandler } from 'react-router';
import SearchGithub from './SearchGithub';
import Header from './Header';
import Rebase from 're-base';

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn,
      googleUser: this.props.googleUser,
      email: this.props.email
    };
  }
  init(){
    console.log('Init called');
    var controller = this;

    this.ref = new Firebase('https://rushchad.firebaseio.com/');
    var currentAuthData = this.ref.getAuth();
    if (currentAuthData) {
      console.log('User is already logged in.');
      console.log(currentAuthData["google"]);
      this.setState({
        loggedIn: true,
        googleUser: currentAuthData["google"],
        email: currentAuthData["google"]["email"]
      });
      console.log(this.state.loggedIn);
      console.log(this.state.googleUser);
      console.log(this.state.email);
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
          controller.init();
        }
      }, {
        scope: "email"
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
          <div className="container">
            <h3>You are not authenticated. <a href="">Login</a></h3>
          </div>
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