import React from 'react';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import '@styles/Home/Home.Contact.css';

export const Home_ContactSection = () => {
    return (
        <div className="contact-section">
            <div className='container-md'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div>
                            <h2 className='fw-bold text-light'>Got Any <span className='text-primary'>Concerns?</span></h2>
                        </div>
                        <hr className="contact-separator text-light" />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-9'>
                        <form className='d-flex flex-column gap-3'>
                            <div>
                                <label className='text-light text-fs-3' htmlFor='name'>Name</label>
                                <input type='text' id='name' className='form-control text-fs-5' placeholder='Enter your name (Optional)' />
                            </div>
                            <div>
                                <label className='text-light text-fs-3' htmlFor='email'>Email</label>
                                <input type='email' id='email' className='form-control text-fs-5' placeholder='Enter your email' required />
                            </div>
                            <div>
                                <label className='text-light text-fs-3' htmlFor='message'>Message</label>
                                <textarea id='message' className='form-control' placeholder='Enter your concern' rows="10" cols="50" />
                            </div>
                            <input className='btn bw-3 fw-bold btn-outline-light btn-block' type="submit" value="Send Message" />
                        </form>
                    </div>
                    <div className='col-md-3'>
                        <div className='contact-section-infos d-flex flex-column'>
                            <label className='text-light '>Contact Information</label>
                            <div className=' card-body bg-body p-3 rounded-3'>
                                <div className=' d-flex  flex-row gap-3'>
                                    <FiPhone />
                                    <p >+639 123 456 7890</p>
                                </div>
                                <div className=' d-flex flex-row gap-3'>
                                    <FiMail />
                                    <p>sample@gmail.com</p>
                                </div>
                                <div className=' d-flex  flex-row gap-3'>
                                    <FiMapPin />
                                    <p>Cebu City, Cebu</p>
                                </div>
                            </div>
                            <br />
                            <div className=' card-body bg-body p-3 rounded-3'>
                                <div className=' d-flex  flex-row gap-3'>
                                    <FiPhone />
                                    <p >+639 123 456 7890</p>
                                </div>
                                <div className=' d-flex flex-row gap-3'>
                                    <FiMail />
                                    <p>sample@gmail.com</p>
                                </div>
                                <div className=' d-flex  flex-row gap-3'>
                                    <FiMapPin />
                                    <p>Cebu City, Cebu</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
