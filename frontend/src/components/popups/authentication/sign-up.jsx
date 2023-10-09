import React from 'react';
import { FiX } from 'react-icons/fi';
import './sign-in.css'; // You can use the same CSS file as the SignInPopup

export const SignUpPopup = ({ onClose }) => {
    return (
        <div className="modal custom-modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Sign Up</h4>
                        <button type="button" className="close" onClick={onClose}>
                            <FiX className="sign-in-close" />
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
                                            <div className='sign-in-forms-inputs-remember' htmlFor="remember">
                                                <input type="checkbox" id="remember" name="remember" required />
                                                <p className='body-small'>Remember me</p>
                                            </div>
                                            <div className='sign-in-forms-inputs-buttons'>
                                                <button className='btn btn-secondary btn-block' type="submit">Incubatee</button>
                                                <button className='btn btn-secondary btn-block' type="submit">Incubator</button>
                                            </div>
                                            <div className='separator' />
                                            <p className='body-small'>Don't have an account? <span className='link'>Create an Account</span></p>
                                            <button className='btn btn-outline-secondary btn-block'>Create Account</button>
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
