import PageTitleBar from 'Components/PageTitleBar/PageTitleBar'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import IntlMessages from 'Util/IntlMessages'
import NavTitle from '../ReuseComponent/NavTitle'

const ViewProject = (props) => {
 
console.log("propsp",props)
  
  return (
    <div>
      <Helmet>
        <title> View Project</title>
        <meta name="description" content="View Project" />
      </Helmet>
      <div className="charts-widgets-wrapper">
    <div className=" d-flex align-items-cente">

     <NavTitle props={props}/>
     <PageTitleBar title={<IntlMessages id="sidebar.viewpro" />} match={props.match} />
       
    </div>

        </div>
    </div>
  )
}

export default ViewProject