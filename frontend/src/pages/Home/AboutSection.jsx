import '../Home/AboutSection.css';
import about_image from '../../assets/img/home/about-section-man.png';

export const AboutSection = () => {
    return (
        <div className="about-section">
            <div className='about-section-content'>
                <div className="about-section-imgs">
                    <img src={about_image}/>
                </div>

                <div className='about-section-texts'>
                    <h2 className='contrast'>Why <span className='highlight-gold'>Incubate</span> Your Ideas?</h2>
                    <p className='body-large contrast'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea c ommodo consequat. 
                        <br/><br/>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        <br/><br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea c ommodo consequat. 
                        <br/><br/>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        </div>
    )
}