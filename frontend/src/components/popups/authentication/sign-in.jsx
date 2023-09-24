import React from 'react';
import { FiX } from 'react-icons/fi';

export const SignInPopup = ({ onClose }) => {
    return (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
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
                                        <div className='sign-in-header'>
                                            <h4>Sign in</h4>
                                            <FiX className="sign-in-close" onClick={onClose} />
                                        </div>

                                        <div className='separator' />
                                        <div className='sign-in-forms-inputs'>
                                            <label htmlFor='email'>Email</label>
                                            <input type='email' id='email' className='form-control' placeholder='Enter your email' required></input>
                                            <label htmlFor='password'>Password</label>
                                            <input type='password' id='password' className='form-control' placeholder='Enter your password' required></input>
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