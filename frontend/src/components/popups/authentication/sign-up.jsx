import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "./sign-up.css";
import { SignInPopup } from './sign-in';

export const SignUpPopup = ({ show, handleClose }) => {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleShowSignIn = () => {
    setShowSignIn(true);
  };

  const handleCloseSignIn = () => {
    setShowSignIn(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <div className='d-flex flex-row'>
        <div className='col-md-6'>
          <div className='sign-up-img'>
            <div className='sign-up-img-overlay'></div>
          </div>
        </div>
        <div className='col-md-6 p-3'>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className='d-flex flex-column gap-3'>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" required />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" required />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" required />
              </Form.Group>
              <Form.Group controlId="agreement">
                  <Form.Check type="checkbox" label="I agree to the terms and conditions" required />
              </Form.Group>
            <button className="btn btn-outline-secondary bw-3 btn-block fw-bold" >Create Account</button>
            </Form>
            <br/>
            <p className="body-small">Already have an account? <span className="text-secondary link" onClick={handleShowSignIn}>Sign In</span></p>
            {showSignIn && <SignInPopup show={showSignIn} handleClose={handleCloseSignIn} />}
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
