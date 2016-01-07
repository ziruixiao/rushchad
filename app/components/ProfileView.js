import React from 'react';
import Rebase from 're-base';

class ProfileView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }
  init(){

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
    var username = this.router.getCurrentParams().username;
    return (
      <div>

      </div>
    )
  }
};

ProfileView.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default ProfileView;