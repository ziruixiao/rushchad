import React from 'react';
import {
  Table
} from 'react-bootstrap';
import TimeAgo from 'react-timeago';
import StarRating from 'react-star-rating';
import Sortbar from './Sortbar';

class ListView extends React.Component{
  showDetailView(rusheeId) {
    console.log(rusheeId);
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
  render(){
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

      return (
        <tr key={key} onClick={this.showDetailView.bind(this, this.props.rushees[key][0])}>
          <td>{rushee["firstName"]}</td>
          <td>{rushee["lastName"]}</td>
          <td>{numComments}</td>
          <td> <StarRating name="rusheeRating" size={17} disabled rating={stars} totalStars={5} />
          </td>
          <td>{numRatings}</td>
          <td><TimeAgo date={lastUpdated}/></td>
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