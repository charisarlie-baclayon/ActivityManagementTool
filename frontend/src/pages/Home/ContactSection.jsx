import '../Home/ContactSection.css';

export const ContactSection = () => {
    return (
        <div className="contact-section">
            <div className='contact-section-content'>
                <div className='contact-section-texts'>
                    <h2 className='contrast'>Got Any <span className='highlight-gold'>Concerns?</span></h2>
                    <p className='body-large contrast'>How can we help you? Let us know by sending us a message!</p>
                </div>
                <div className="separator-contrast"/>
                <div className='contact-section-forms'>
                    <div className='contact-section-inputs'>
                        <label className='contrast' htmlFor='name'>Name</label>
                        <input type='text' id='name' placeholder='Enter your name (Optional)'></input>
                        <label className='contrast' htmlFor='name'>Email</label>
                        <input type='text' id='email' placeholder='Enter your email' required></input>
                        <label className='contrast' htmlFor='message'>Message</label>
                        <textarea id='message' placeholder='Enter your concern' rows="10" cols="50"></textarea>
                        <input className='primary-fill'type="submit" value="Send Message"/>
                    </div>

                    <div className='contact-section-infos'>
                        <h6 className='contrast'>Contact Information</h6>
                        <div className='contact-section-info-card'>
                            <div className='contact-section-info'> 
                                <i></i>
                                <p className='body-medium'>+639 123 456 7890</p>
                            </div>
                            <div className='contact-section-info'>
                                <i></i>
                                <p className='body-medium'>sample@gmail.com</p>
                            </div>
                            <div className='contact-section-info'>
                                <i></i>
                                <p className='body-medium'>Cebu City, Cebu</p>
                            </div>
                        </div>

                        <div className='contact-section-info-card'>
                            <div className='contact-section-info'> 
                                <i></i>
                                <p className='body-medium'>+639 123 456 7890</p>
                            </div>
                            <div className='contact-section-info'>
                                <i></i>
                                <p className='body-medium'>sample@gmail.com</p>
                            </div>
                            <div className='contact-section-info'>
                                <i></i>
                                <p className='body-medium'>Cebu City, Cebu</p>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    )
}