import React from 'react';
import Repos from './Github/Repos';
import UserProfile from './Github/UserProfile';
import Notes from './Notes/Notes';
import helpers from '../utils/helpers';
import Rebase from 're-base';

var base = Rebase.createClass('https://rushchad.firebaseio.com/');

class ProfileView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      notes: [],
      bio: {},
      repos: []
    };
  }
  init(){
    this.ref = base.syncState('rushees', {
      context: this,
      asArray: true,
      state: 'notes',
      queries: {
        orderByChild: 'access',
        equalTo: 'normal'
      }
    });

    helpers.getGithubInfo(this.router.getCurrentParams().username)
      .then((dataObj) => {
        this.setState({
          bio: dataObj.bio,
          repos: dataObj.repos
        });
      });
  }
  componentWillMount(){
    this.router = this.context.router;
  }
  componentDidMount(){
    this.init();
  }
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }
  componentWillReceiveProps(){
    base.removeBinding(this.ref);
    this.init();
  }
  handleAddNote(newNote){
    this.setState({
      notes: this.state.notes.concat([newNote])
    })
  }
  render(){
    var username = this.router.getCurrentParams().username;
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={username} bio={this.state.bio}/>
        </div>
        <div className="col-md-4">
          <Repos username={username} repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes
            username={username}
            notes={this.state.notes}
            addNote={this.handleAddNote.bind(this)} />
        </div>
      </div>
    )
  }
};

ProfileView.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default ProfileView;