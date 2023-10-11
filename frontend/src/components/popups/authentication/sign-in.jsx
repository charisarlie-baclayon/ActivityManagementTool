import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "./sign-in.css";
import { SignUpPopup } from './sign-up';

export const SignInPopup = ({ show, handleClose }) => {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleShowSignUp = () => {
    setShowSignUp(true);
  };

  const handleCloseSignUp = () => {
    setShowSignUp(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <div className='d-flex flex-row'>
        <div className='col-md-6'>
          <div className='sign-in-img'>
            <div className='sign-in-img-overlay'></div>
          </div>
        </div>
        <div className='col-md-6'>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className='d-flex flex-column gap-3'>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" required />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" required />
              </Form.Group>
              <Form.Group controlId="remember">
                  <Form.Check type="checkbox" label="Remember me" required />
              </Form.Group>
              <button className="btn btn-outline-secondary bw-3 btn-block fw-bold">Incubatee</button>
              <button className="btn btn-secondary bw-3 btn-block fw-bold">Incubator</button>
            </Form>

            <br/>
            <p>Don't have an account? <span className=" text-secondary link" onClick={handleShowSignUp}>Create an Account</span></p>
            {showSignUp && <SignUpPopup show={showSignUp} handleClose={handleCloseSignUp} />}
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary bw-3 btn-block fw-bold" onClick={handleClose}>
              Cancel
            </button>
          </Modal.Footer>
        </div>
      </div>
    </Modal>
  );
};
