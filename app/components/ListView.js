import React from 'react';
import {
  Table,
Glyphicon,
Button
} from 'react-bootstrap';
import TimeAgo from 'react-timeago';
import StarRating from 'react-star-rating';
import Sortbar from './Sortbar';
import * as firebaseActions from './firebaseActions';

class ListView extends React.Component{
  showDetailView(rusheeId) {
    var router = this.context.router;
    router.transitionTo('detail', {rusheeId: rusheeId});
  }
  componentWillMount(){
    this.router = this.context.router;
  }
  init() {
    this.props.updateStateRushees();
  }
  componentDidMount(){
    this.init();
  }
  deleteClicked(value) {
    // 1. Build dictionary
    var dictionary = {
      "active": "round1CutAfter"
    };
    firebaseActions.addOrUpdateRushee(value, dictionary, this.props.loggedInUserId);
  }
  render(){
    var deleteButton;
    var rusheeList = Object.keys(this.props.rushees).map((key) => {
      var rushee = this.props.rushees[key][1];
      var lastUpdated = new Date(Number(rushee["lastUpdated"])*1000);
      var numComments= (rushee["comments"]) ? Object.keys(rushee["comments"]).length : 0;
      var numRatings = (rushee["ratings"]) ? Object.keys(rushee["ratings"]).length : 0;

      var stars = 0.1;
      if (rushee["ratings"]) {
        var count = 0;
        var sum = 0;
        Object.keys(rushee["ratings"]).map((key) => {
          sum += Number(rushee["ratings"][key]["value"]);
          count++;
        });
        stars = Math.round(sum/count);
      }
      if (this.props.loggedInUserId == 1) {
        deleteButton = <Button onClick={this.deleteClicked.bind(this,this.props.rushees[key][0])}><Glyphicon glyph="trash" /></Button>;
      }

      return (
        <tr key={key} >
          <td onClick={this.showDetailView.bind(this, this.props.rushees[key][0])}>{rushee["firstName"]}</td>
          <td onClick={this.showDetailView.bind(this, this.props.rushees[key][0])}>{rushee["lastName"]}</td>
          <td onClick={this.showDetailView.bind(this, this.props.rushees[key][0])}>{numComments}</td>
          <td onClick={this.showDetailView.bind(this, this.props.rushees[key][0])}> <StarRating name="rusheeRating" size={17} disabled rating={stars} totalStars={5} />
          </td>
          <td onClick={this.showDetailView.bind(this, this.props.rushees[key][0])}>{numRatings}</td>
          <td onClick={this.showDetailView.bind(this, this.props.rushees[key][0])}><TimeAgo date={lastUpdated}/></td>
          <td>{deleteButton}</td>
        </tr>)
    });
    return (
      <div>
        <Sortbar updateFunction={this.props.updateStateRushees}/>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>First</th>
            <th>Last</th>
            <th>Comments</th>
            <th>Rating</th>
            <th>Votes</th>
            <th>Last Updated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {rusheeList}
        </tbody>
      </Table>
      </div>
    )
  }
};

ListView.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default ListView;