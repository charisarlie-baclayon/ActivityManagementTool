import React from 'react';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import '@styles/Home/Home.Contact.css';

export const ContactSection = () => {
    return (
        <div className="contact-section">
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'> {/* 100% width */}
                        <div className='contact-section-texts'>
                            <h3 className='fw-bold text-light'>Got Any <span className='text-primary'>Concerns?</span></h3>
                        </div>
                        <hr className="contact-separator text-light" />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-9'> {/* 75% width */}
                        <form className='contact-section-inputs'>
                            <div>
                                <label className='text-light' htmlFor='name'>Name</label>
                                <input type='text' id='name' className='form-control' placeholder='Enter your name (Optional)' />
                            </div>
                            <div>
                                <label className='text-light' htmlFor='email'>Email</label>
                                <input type='email' id='email' className='form-control' placeholder='Enter your email' required />
                            </div>
                            <div>
                                <label className='text-light' htmlFor='message'>Message</label>
                                <textarea id='message' className='form-control' placeholder='Enter your concern' rows="10" cols="50" />
                            </div>
                            <input className='btn text-fs-3 fw-bold btn-primary btn-block' type="submit" value="Send Message" />
                        </form>
                    </div>
                    <div className='col-md-3'> {/* 25% width */}
                        <div className='contact-section-infos'>
                            <h6 className='text-light'>Contact Information</h6>
                            <div className='contact-section-info-card'>
                                <div className='contact-section-info'>
                                    <FiPhone />
                                    <p className='text-fs-3'>+639 123 456 7890</p>
                                </div>
                                <div className='contact-section-info'>
                                    <FiMail />
                                    <p className='text-fs-3'>sample@gmail.com</p>
                                </div>
                                <div className='contact-section-info'>
                                    <FiMapPin />
                                    <p className='text-fs-3'>Cebu City, Cebu</p>
                                </div>
                            </div>
                            <div className='contact-section-info-card'>
                                <div className='contact-section-info'>
                                    <FiPhone />
                                    <p className='text-fs-3'>+639 123 456 7890</p>
                                </div>
                                <div className='contact-section-info'>
                                    <FiMail />
                                    <p className='text-fs-3'>sample@gmail.com</p>
                                </div>
                                <div className='contact-section-info'>
                                    <FiMapPin />
                                    <p className='text-fs-3'>Cebu City, Cebu</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
