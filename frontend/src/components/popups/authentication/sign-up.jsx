import React from 'react';
import { FiX } from 'react-icons/fi';

export const SignUpPopup = ({ onClose }) => {
    return (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='sign-up-img'>
                                        <div className='sign-up-img-overlay'></div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='sign-up-forms'>
                                        <div className='sign-up-header'>
                                            <h4>Sign Up</h4>
                                            <FiX className="sign-up-close" onClick={onClose} />
                                        </div>

                                        <div className='separator' />
                                        <div className='sign-up-forms-inputs'>
                                            <div className="form-group">
                                                <label htmlFor='name'>Name</label>
                                                <input type='text' id='name' className='form-control' placeholder='Enter your name' required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor='email'>Email</label>
                                                <input type='email' id='email' className='form-control' placeholder='Enter your email' required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor='password'>Password</label>
                                                <input type='password' id='password' className='form-control' placeholder='Enter your password' required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor='repassword'>Re-enter Password</label>
                                                <input type='password' id='repassword' className='form-control' placeholder='Re-enter your password' required />
                                            </div>
                                            <div className='sign-up-forms-inputs-agreement' htmlFor='agreement'>
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