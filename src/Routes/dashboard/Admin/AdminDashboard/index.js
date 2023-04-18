import React from 'react'
// rct card box

import { Helmet } from "react-helmet";


// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import TransactionList2 from './TransactionList2';
import TransactionList from './TransactionList';


import CustomBreadcrumbs from 'Routes/dashboard/ReuseComponent/CustomBreadcrumbs';
const AdminDashboard = (props) => {
  const { location } = props
  return (


        <div className="ecom-dashboard-wrapper">
            <Helmet>
              <title> Admin Dashboard </title>
              <meta name="description" content="user Dashboard" />
            </Helmet>
      
          <div className="charts-widgets-wrapper">
             <CustomBreadcrumbs currentPage={"Admin Dashboard"} data={location?.state?.breadcrumbData} />

             <RctCollapsibleCard className="p-0">
                <TransactionList2 />
      
             </RctCollapsibleCard>
          <div>
        </div>
      </div>

    </div>
  )
}

export default AdminDashboard
