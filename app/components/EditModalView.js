import React from 'react';
import {
  Col,
  Input,
  ButtonInput,
  Modal,
  Button
} from 'react-bootstrap';

class EditModalView extends React.Component{
  render(){
    return (
      <div>
        <Modal show={this.props.showEditModal} onHide={this.props.closeAction}>
          <Modal.Header closeButton>
            <Modal.Title>Add/Edit Rushee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Input type="text" label="Text" placeholder="Enter text" />
              <Input type="email" label="Email Address" placeholder="Enter email" />
              <Input type="password" label="Password" />
              <Input type="checkbox" label="Checkbox" checked readOnly />
              <Input type="radio" label="Radio" checked readOnly />
              <Input type="select" label="Select" placeholder="select">
                <option value="select">select</option>
                <option value="other">...</option>
              </Input>
              <Input type="textarea" label="Text Area" placeholder="textarea" />
              <ButtonInput value="Button Input" />
              <ButtonInput type="reset" value="Reset Button" />
              <ButtonInput type="submit" value="Submit Button" />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.closeAction}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
};

export default EditModalView;