/**
 * Created by Felix on 1/11/16.
 */
import React from 'react';
import {
ButtonToolbar,
Button,
Glyphicon,
  Col
} from 'react-bootstrap';

class Sortbar extends React.Component{
  handleOrderSwitch(newOrder) {
    localStorage.setItem('rusheeOrdering', newOrder);
    this.props.updateFunction();
  }
  /*handleCutSwitch(newOrder) {
    localStorage.setItem('showCutList', newOrder);
    this.props.updateFunction();
  }*/
  render(){
    var ordering = localStorage.getItem('rusheeOrdering') || 'lastUpdated_Z_A';
    //var showCutList = localStorage.getItem('showCutList') || 'all';
    return (

      <div className="align-center">
        {/*<ButtonToolbar>
          <Button onClick={this.handleCutSwitch.bind(this,'all')} bsStyle={showCutList == "all" ? "primary" :"default"}>All</Button>
          <Button onClick={this.handleCutSwitch.bind(this,'round3yes')} bsStyle={showCutList == "round3yes" ? "primary" :"default"}>YES</Button>
          <Button onClick={this.handleCutSwitch.bind(this,'round3maybe')} bsStyle={showCutList == "round3maybe" ? "primary" :"default"}>MAYBE</Button>
          <Button onClick={this.handleCutSwitch.bind(this,'round3no')} bsStyle={showCutList == "round3no" ? "primary" :"default"}>NO</Button>

        </ButtonToolbar>
        <br />*/ }
        <ButtonToolbar>
          <Button onClick={this.handleOrderSwitch.bind(this,'first_A_Z')} bsStyle={ordering == "first_A_Z" ? "primary" :"default"}>First (A-Z)</Button>
          <Button onClick={this.handleOrderSwitch.bind(this,'first_Z_A')} bsStyle={ordering == "first_Z_A" ? "primary" :"default"}>First (Z-A)</Button>
          <Button onClick={this.handleOrderSwitch.bind(this,'last_A_Z')} bsStyle={ordering == "last_A_Z" ? "primary" :"default"}>Last (A-Z)</Button>
          <Button onClick={this.handleOrderSwitch.bind(this,'last_Z_A')} bsStyle={ordering == "last_Z_A" ? "primary" :"default"}>Last (Z-A)</Button>
          <Button onClick={this.handleOrderSwitch.bind(this,'lastUpdated_Z_A')} bsStyle={ordering == "lastUpdated_Z_A" ? "primary" :"default"}>Last Updated</Button>
          <Button onClick={this.handleOrderSwitch.bind(this,'popularity_Z_A')} bsStyle={ordering == "popularity_Z_A" ? "primary" :"default"}>Most Popular</Button>
          <Button onClick={this.handleOrderSwitch.bind(this,'popularity_A_Z')} bsStyle={ordering == "popularity_A_Z" ? "primary" :"default"}>Least Popular</Button>
        </ButtonToolbar>
        <br />
      </div>
    )
  }
};

export default Sortbar;