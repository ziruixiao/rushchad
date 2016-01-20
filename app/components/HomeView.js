import React from 'react';
import {
  Col,
  Alert
} from 'react-bootstrap';
import RusheeTile from './RusheeTile';
import Sortbar from './Sortbar';

class HomeView extends React.Component{
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
    var cutParameter = this.router.getCurrentParams().status;

    var rusheeTiles = Object.keys(this.props.rushees).map((key) => {
      if (cutParameter) {
        if (this.props.rushees[key][1]["cutParameter"]) {
          if (cutParameter == this.props.rushees[key][1]["cutParameter"]) {
            return (<RusheeTile key={key} rusheeId={this.props.rushees[key][0]}
                                rushee={this.props.rushees[key][1]}/>);
          }
        }

      } else {
        return (<RusheeTile key={key} rusheeId={this.props.rushees[key][0]}
                            rushee={this.props.rushees[key][1]}/>);
      }
    });
    return (
      <div>
        <Alert bsStyle="warning">
          Pay Connor Garet <strong>$60 in cash</strong> by <strong>Tuesday 1/19</strong> for semi-formal.
        </Alert>
        <Sortbar updateFunction={this.props.updateStateRushees}/>

        <div>
          {rusheeTiles}
        </div>
      </div>
    )
  }
};

HomeView.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default HomeView;