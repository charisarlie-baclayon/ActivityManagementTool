import React from 'react'

const MenuBar = () => {
  return (
    <div>
        <div className='container'>
            <nav className="navbar navbar-expand-md navbar-light">
                <a href="#" className="navbar-brand">Bootstrap 5</a>
            </nav>

            <button
                className='navbar-toggler'
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="toggleMobileMenu"
                aria-controls='toggleMobileMenu'
                aria-expanded="false"
                aria-label='Toggle navigation'
            >
                <span className="navbar-toggler-icon"></span>

                 
            </button>

            <div className="collapse navbar-collapse" id="toggleMobileMenu">
                    <ul className="navbar-nav">
                        <li>
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li>
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                        <li>
                            <a className="nav-link" href="#">Features</a>
                        </li>
                    </ul>
                </div> 

        </div>
    </div>
  )
}

export default MenuBar