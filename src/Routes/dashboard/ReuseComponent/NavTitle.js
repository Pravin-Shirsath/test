import React from 'react'
import { useHistory } from 'react-router';

const NavTitle = ({props}) => {
    const history = useHistory();
    const {location,match}= props
  return (
    <div className="page-title d-flex justify-content-between align-items-center mr-2">
       
            <div className="page-title-wrap" onClick={()=> location?.state?.BackPath ? history.push(location?.state?.BackPath):null}>
               <i className="ti-angle-left text-dark"></i>
               <h2 className="text-dark">{location?.state?.pathname}</h2>
            </div>
              </div>
  )
}

export default NavTitle
