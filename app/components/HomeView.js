import React from 'react';
import {
  Col
} from 'react-bootstrap';
import RusheeTile from './RusheeTile';

class HomeView extends React.Component{
  render(){
    return (
      <div>
        <h2 className="text-center">
          Home View
        </h2>
        <RusheeTile />
      </div>
    )
  }
};

export default HomeView;