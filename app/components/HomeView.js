import React from 'react';
import {
  Col,
  Alert
} from 'react-bootstrap';
import RusheeTile from './RusheeTile';
import Sortbar from './Sortbar';

class HomeView extends React.Component{
  render(){
    var rusheeTiles = Object.keys(this.props.rushees).map((key) => {
      return <RusheeTile key={key} rusheeId={this.props.rushees[key][0]} rushee={this.props.rushees[key][1]}/>
    });
    return (
      <div>
        <Alert bsStyle="warning">
          Round 1 Cut Meeting: <strong></strong> at <strong>12:00PM</strong> in <strong>Soc Psych 130</strong>.
        </Alert>
        <Sortbar updateFunction={this.props.updateFirebaseConnection}/>

        <div>
          {rusheeTiles}
        </div>
      </div>
    )
  }
};

export default HomeView;