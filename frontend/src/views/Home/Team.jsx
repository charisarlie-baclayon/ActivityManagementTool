import React from 'react';
import charisBaclayon from '@assets/img/home/profile-charisbaclayon.png';
import jeremyFlores from '@assets/img/home/profile-jeremyflores.png';
import robertWacan from '@assets/img/home/profile-robertwacan.png';
import kidCostelo from '@assets/img/home/profile-kidcostelo.png';
import jamesPadecio from '@assets/img/home/profile-jamespadecio.png';
import '@styles/Home/Home.Team.css';

export const Home_TeamSection = () => {
    return (
        <div className="team-section ">
            <div className='container-md'>
                <div className='d-flex flex-column gap-3 '>
                    <div className='d-flex flex-column gap-3 '>
                        <h2 className='text-center fw-bold '>Meet the <span className='text-secondary'>Team</span></h2>
                        <h6 className=' text-center'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </h6>
                    </div>
                    <hr />
                    <div className='row justify-content-around'>
                        <div className='col-md-2'>
                            <div className='d-flex flex-column align-items-center text-center gap-3'>
                                <img src={charisBaclayon} alt='profile' className='img-fluid rounded-circle' />
                                <h6 className=' fw-bold'>Charis Arlie <br />Baclayon</h6>
                                <p className=' fw-bold'><span className='text-secondary'>Manager</span></p>
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <div className=' d-flex flex-column align-items-center  text-center gap-3'>
                                <img src={jeremyFlores} alt='profile' className='img-fluid rounded-circle' />
                                <h6 className='fw-bold'>Jeremy Jules <br />Flores</h6>
                                <p className=' fw-bold'><span className='text-secondary'>Co-Manager</span></p>
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <div className='d-flex flex-column align-items-center  text-center gap-3'>
                                <img src={robertWacan} alt='profile' className='img-fluid rounded-circle' />
                                <h6 className='fw-bold '>Robert William <br />Wacan</h6>
                                <p className=' fw-bold'><span className='text-secondary'>Developer</span></p>
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <div className='d-flex flex-column align-items-center  text-center gap-3'>
                                <img src={kidCostelo} alt='profile' className='img-fluid rounded-circle' />
                                <h6 className='fw-bold'>Kid Omar <br />Costelo</h6>
                                <p className=' fw-bold'><span className='text-secondary'>Developer</span></p>
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <div className='d-flex flex-column align-items-center  text-center gap-3'>
                                <img src={jamesPadecio} alt='profile' className='img-fluid rounded-circle' />
                                <h6 className='fw-bold '>James Lewel <br />Padecio</h6>
                                <p className=' fw-bold'><span className='text-secondary'>Designer</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}