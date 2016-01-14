import React from 'react';
import {
  Col,
  Alert
} from 'react-bootstrap';
import RusheeTile from './RusheeTile';
import Sortbar from './Sortbar';

class HomeView extends React.Component{
  init() {
    this.props.updateStateRushees();
  }
  componentDidMount(){
    this.init();
  }
  render(){
    var rusheeTiles = Object.keys(this.props.rushees).map((key) => {

      return (<RusheeTile key={key} rusheeId={this.props.rushees[key][0]} rushee={this.props.rushees[key][1]}/>);
    });
    return (
      <div>
        <Alert bsStyle="warning">
          Saturday 1/16: <strong>4:00pm</strong> in <strong>Hudson Hall 125</strong>: Mid-Round Cut Meeting
        </Alert>
        <Sortbar updateFunction={this.props.updateStateRushees}/>

        <div>
          {rusheeTiles}
        </div>
      </div>
    )
  }
};

export default HomeView;