import '../Home/HeroSection.css';
import hero_image from "../../assets/img/home/hero-section-woman.png";

export const HeroSection = () => {
    return (
        <div className="hero-section">
            <div className="hero-section-content">
                <div className="hero-section-texts">
                    <h2>Where Ideas <span className="highlight-maroon">Hatch</span>
                    <br/><span className="highlight-maroon">Futures</span> Form
                    </h2>

                    <p className="body-large">Join our collaborative platform for student innovators, and embark on a journey of creativity, mentorship, and limitless possibilities.</p>
                    
                    <div className="hero-section-cards">
                        <div className="hero-section-maroon-card">
                            <h6>Create your idea</h6>
                            <p className="body-medium">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            <br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea c ommodo consequat. 
                            </p>
                            <button className="secondary-outline">Learn More</button>
                        </div>
                        <div className="hero-section-black-card">
                            <h6>Know us Better</h6>
                            <p className="body-medium">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            <br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea c ommodo consequat. 
                            </p>
                            <button className="black-outline">Learn More</button>
                        </div>
                    </div>
                </div>

                <div className="hero-section-imgs">
                    <img src={hero_image} alt="hero-section-woman"/>
                </div>
            </div>
        </div>
    )
}