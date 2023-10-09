import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export const SignUpPopup = ({ onClose }) => {
    
    return (
        <div className="modal fade show" id="signUpModal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Sign Up</h4>
                        <button type="button" className="close" onClick={onClose}>
                            <FiX className="sign-up-close" />
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='sign-in-img'>
                                        <div className='sign-in-img-overlay'></div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='sign-in-forms'>
                                        <div className='separator' />
                                        <div className='sign-in-forms-inputs'>
                                            <label htmlFor='name'>Name</label>
                                            <input type='text' id='name' className='form-control' placeholder='Enter your name' required />
                                            <label htmlFor='email'>Email</label>
                                            <input type='email' id='email' className='form-control' placeholder='Enter your email' required />
                                            <label htmlFor='password'>Password</label>
                                            <input type='password' id='password' className='form-control' placeholder='Enter your password' required />
                                            <label htmlFor='repassword'>Re-enter Password</label>
                                            <input type='password' id='repassword' className='form-control' placeholder='Re-enter your password' required />
                                            <div className='sign-in-forms-inputs-agreement' htmlFor='agreement'>
                                                <div className="form-check">
                                                    <input type='checkbox' id='agreement' className='form-check-input' name='agreement' required />
                                                    <label className='form-check-label' htmlFor='agreement'>I agree to the terms and conditions</label>
                                                </div>
                                            </div>
                                            <button className='btn btn-secondary btn-block' type="submit">Get Started</button>
                                            <div className='separator' />
                                            <p className='body-small'>Already have an account? <span className='link'>Sign In</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
