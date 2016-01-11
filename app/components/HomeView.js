import React from 'react';
import {
  Col
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
        <Sortbar />
        <div>
          {rusheeTiles}
        </div>
      </div>
    )
  }
};

export default HomeView;