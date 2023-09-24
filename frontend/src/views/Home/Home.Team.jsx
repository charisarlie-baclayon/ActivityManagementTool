import React from 'react';
import baclayon from '@assets/img/home/profile-charisbaclayon.png';
import flores from '@assets/img/home/profile-jeremyflores.png';
import wacan from '@assets/img/home/profile-robertwacan.png';
import costelo from '@assets/img/home/profile-kidcostelo.png';
import padecio from '@assets/img/home/profile-jamespadecio.png';
import '@styles/Home/Home.Team.css'; // Import your CSS file with the appropriate class names

export const TeamSection = () => {
    return (
        <div className="team-section">
            <div className='container'>
                <div className='team-section-texts'>
                    <h2 className='text-center fw-bold '>Meet the <span className='text-secondary'>Team</span></h2>
                    <p className='text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <hr className='separator' />
                <div className='row justify-content-between gap-5 '>
                    <div className='col-md'>
                        <div className='team-section-profile-card text-center'>
                            <img src={baclayon} alt='profile' className='img-fluid rounded-circle' />
                            <h6 className=' fw-bold'>Charis Arlie Baclayon</h6>
                            <p className='fw-bold'><span className='text-secondary'>Manager</span></p>
                            <p className='text-fs-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </div>
                    </div>
                    <div className='col-md'>
                        <div className='team-section-profile-card text-center'>
                            <img src={flores} alt='profile' className='img-fluid rounded-circle' />
                            <h6 className='fw-bold'>Jeremy Jules Flores</h6>
                            <p className='fw-bold'><span className='text-secondary'>Co-Manager</span></p>
                            <p className='text-fs-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </div>
                    </div>
                    <div className='col-md'>
                        <div className='team-section-profile-card text-center'>
                            <img src={wacan} alt='profile' className='img-fluid rounded-circle' />
                            <h6 className='fw-bold '>Robert William Wacan</h6>
                            <p className='fw-bold'><span className='text-secondary'>Developer</span></p>
                            <p className='text-fs-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </div>
                    </div>
                    <div className='col-md'>
                        <div className='team-section-profile-card text-center'>
                            <img src={costelo} alt='profile' className='img-fluid rounded-circle' />
                            <h6 className='fw-bold'>Kid Omar Costelo</h6>
                            <p className='fw-bold'><span className='text-secondary'>Developer</span></p>
                            <p className='text-fs-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </div>
                    </div>
                    <div className='col-md'>
                        <div className='team-section-profile-card text-center'>
                            <img src={padecio} alt='profile' className='img-fluid rounded-circle' />
                            <h6 className='fw-bold '>James Lewel Padecio</h6>
                            <p className='fw-bold'><span className='text-secondary'>Designer</span></p>
                            <p className='text-fs-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}