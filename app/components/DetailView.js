/**
 * Created by Felix on 1/4/16.
 */
import React from 'react';
import {

} from 'react-bootstrap';

class DetailView extends React.Component{
  render(){
    var { email } = this.props;
    return (
      <div>
        Rushee Detail View
        Email is { email}
      </div>
    )
  }
};

export default DetailView;