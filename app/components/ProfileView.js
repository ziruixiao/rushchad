import React from 'react';
import {
  Table
} from 'react-bootstrap';
import TimeAgo from 'react-timeago';

class ProfileView extends React.Component{
  componentWillMount(){
    this.router = this.context.router;
  }
  render(){
    console.log(this.props);
    var usersList = Object.keys(this.props.users).map((key) => {
      var user = this.props.users[key];
      console.log(key);
      console.log(user);
      var lastActive = new Date(Number(user["lastActive"])*1000);

      return (
        <tr key={key}>
          <td>{user["name"]}</td>
          <td><TimeAgo date={lastActive} /></td>
        </tr>)
    });
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
          <tr>
            <th>Name</th>
            <th>Last Active</th>
          </tr>
          </thead>
          <tbody>
          {usersList}
          </tbody>
        </Table>
      </div>
    )
  }
};

ProfileView.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default ProfileView;