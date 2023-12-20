import React from 'react';
import aboutImage from '@assets/img/home/about-section-man.png';
import '@styles/Home/Home.About.css';

export const Home_AboutSection = () => {
	return (
		<div className="about-section">
			<div className='container-md'>
				<div className="row">
					<div className="col-md-6 d-flex justify-content-center">
						<div>
							<img src={aboutImage} alt="About" className="img-fluid" />
						</div>
					</div>
					<div className="col-md-6 about-text d-flex align-items-center">
						<div className='d-flex flex-column gap-3 '>
							<h2 className='text-light fw-bold '>Why <span className='text-primary'>Incubate</span> Your Ideas?</h2>
							<p className='text-light'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								<br /><br />
								Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
