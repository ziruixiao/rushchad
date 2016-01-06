import React from 'react';
import {
  Table
} from 'react-bootstrap';
import TimeAgo from 'react-timeago';
import StarRating from 'react-star-rating';

class ListView extends React.Component{
  showDetailView(rusheeId) {
    console.log(rusheeId);
    var router = this.context.router;
    router.transitionTo('detail', {rusheeId: rusheeId});
  }
  componentWillMount(){
    this.router = this.context.router;
  }
  render(){
    var rusheeList = Object.keys(this.props.rushees).map((key) => {
      var rushee = this.props.rushees[key];
      var lastUpdated = new Date(Number(rushee["lastUpdated"])*1000);
      var numComments= (rushee["comments"]) ? rushee["comments"].length : 0;
      var numRatings = (rushee["ratings"]) ? Object.keys(rushee["ratings"]).length : 0;

      return (
        <tr onClick={this.showDetailView.bind(this, key)}>
          <td>{rushee["firstName"]}</td>
          <td>{rushee["lastName"]}</td>
          <td>{numComments}</td>
          <td> <StarRating name="rusheeRating" size={17} disabled rating={3} totalStars={5} />
          </td>
          <td>{numRatings}</td>
          <td><TimeAgo date={lastUpdated}/></td>
        </tr>)
    });
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>First</th>
            <th>Last</th>
            <th>Comments</th>
            <th>Rating</th>
            <th>Votes</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
        {rusheeList}
        </tbody>
      </Table>
    )
  }
};

ListView.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default ListView;