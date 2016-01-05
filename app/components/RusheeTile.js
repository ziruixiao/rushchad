/**
 * Created by Felix on 1/4/16.
 */
import React from 'react';
import {
Button,
  Col,
  Image,
Modal,

  Panel
} from 'react-bootstrap';
import RusheePopup from './RusheePopup';

class RusheeTile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      show: false
    };
  }
  showModal() {
    this.setState({show: true});
  }
  hideModal() {
    this.setState({show: false});
  }
  render(){
    return (
      <div>
        <Col xs={12} sm={4} md={4}>
          <Panel header="Rushee Name" footer="More Info Here" bsStyle="info" onClick={this.showModal.bind(this)}>
            <Image  src="http://jagc.org/images/avatar.png" responsive/>
          </Panel>
        </Col>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Wrapped Text</h4>
            <p>
              Paragraph here
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
};

RusheeTile.propTypes = {
  show: React.PropTypes.bool
};

RusheeTile.defaultProps = {
  show: false
}

export default RusheeTile;