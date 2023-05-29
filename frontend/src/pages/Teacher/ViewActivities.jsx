import React from 'react'
import VerticalNavBar from '../../assets/common/vertical-nav-bar'

const ViewActivities = () => {
  return (
    <div>
        <VerticalNavBar></VerticalNavBar>
        <div className='page-content'>
        <h1>Henlo World!</h1>
        <p>HIIII</p>
        <button
        id="sidebarCollapse"
        type="button"
        className="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4"
        >
        <i className="fa fa-bars mr-2" />
        <small className="text-uppercase font-weight-bold">Toggle</small>
        </button>
        </div>
    </div>
  )
}

export default ViewActivities