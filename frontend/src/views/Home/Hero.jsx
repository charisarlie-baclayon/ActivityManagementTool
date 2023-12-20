import React from 'react';
import heroImage from "@assets/img/home/hero-section-woman.png";
import "@styles/Home/Home.Hero.css";

export const Home_HeroSection = () => {
	return (
		<div className='hero-section'>
			<div className="container-md">
				<div className="row">
					<div className="col-md-6 d-flex flex-column  gap-3 ">
						<h2 className="fw-bold">
							Where Ideas <span className="text-secondary">Hatch</span>
							<br />
							<span className="text-secondary">Futures</span> Form
						</h2>

						<h6>
							Join our collaborative platform for student innovators, and embark on a journey of creativity, mentorship, and limitless possibilities.
						</h6>

						<div className="row feature-cards">
							<div className="col-md mb-3">
								<div className="card p-3">
									<div className="card-body">
										<h6 className='fw-bold'>Create your Idea</h6>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
										</p>
										<button className="btn w-100 bw-3 fw-bold btn-outline-dark">Learn More</button>
									</div>
								</div>
							</div>
							<div className="col-md mb-3">
								<div className="card bg-dark text-white p-3">
									<div className="card-body">
										<h6 className='fw-bold'>Know us Better</h6>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
										</p>
										<button className="btn w-100 bw-3 fw-bold btn-outline-light">Learn More</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-6 d-flex justify-content-center align-items-center">
						<div>
							<img src={heroImage} alt="Hero" className="img-fluid" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
