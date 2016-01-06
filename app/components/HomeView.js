import React from 'react';
import {
  Col
} from 'react-bootstrap';
import RusheeTile from './RusheeTile';

class HomeView extends React.Component{
  render(){
    var rusheeTiles = Object.keys(this.props.rushees).map((key) => {
      return <RusheeTile key={key} rusheeId={key} rushee={this.props.rushees[key]}/>
    });
    return (
      <div>
        {rusheeTiles}
      </div>
    )
  }
};

export default HomeView;