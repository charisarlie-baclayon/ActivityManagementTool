import '../Home/TeamSection.css';
import baclayon from '../../assets/img/home/profile-charisbaclayon.png';
import flores from '../../assets/img/home/profile-jeremyflores.png';
import wacan from '../../assets/img/home/profile-robertwacan.png';
import costelo from '../../assets/img/home/profile-kidcostelo.png';
import padecio from '../../assets/img/home/profile-jamespadecio.png';

export const TeamSection = () => {
    return (
        <div className="team-section">
            <div className='team-section-content'>
                <h2>Meet the <span className='highlight-maroon'>Team</span></h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea c ommodo consequat. </p>
                <div className="separator"/>
                <div className='team-section-profiles'>
                    <div className='team-section-profile-card'>
                        <img src={baclayon} alt='profile'></img>
                        <h5>Charis Arlie<br/>Baclayon</h5>
                        <h6><span className='highlight-maroon'>Manager</span></h6>
                        <p className='body-medium'>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                    </div>

                    <div className='team-section-profile-card'>
                        <img src={flores} alt='profile'></img>
                        <h5>Jeremy Jules<br/>Flores</h5>
                        <h6><span className='highlight-maroon'>Co-Manager</span></h6>
                        <p className='body-medium'>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                    </div>

                    <div className='team-section-profile-card'>
                        <img src={wacan} alt='profile'></img>
                        <h5>Robert William<br/>Wacan</h5>
                        <h6><span className='highlight-maroon'>Developer</span></h6>
                        <p className='body-medium'>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                    </div>

                    <div className='team-section-profile-card'>
                        <img src={costelo} alt='profile'></img>
                        <h5>Kid Omar<br/>Costelo</h5>
                        <h6><span className='highlight-maroon'>Developer</span></h6>
                        <p className='body-medium'>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                    </div>

                    <div className='team-section-profile-card'>
                        <img src={padecio} alt='profile'></img>
                        <h5>James Lewel<br/>Padecio</h5>
                        <h6><span className='highlight-maroon'>Designer</span></h6>
                        <p className='body-medium'>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                    </div>
                </div>
            </div>
        </div>
    )
}