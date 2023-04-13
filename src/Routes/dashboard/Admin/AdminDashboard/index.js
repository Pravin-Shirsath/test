import React from 'react'
// rct card box

import { Helmet } from "react-helmet";
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import IntlMessages from '../../../../Util/IntlMessages';
import {
    Button
 } from 'reactstrap';

// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { RctCard, RctCardContent } from 'Components/RctCard';
import  TransactionList  from './TransactionList';
import {
  visitorData,
  revenueData,
  salesData,
  dealData,
  transactionList,
  transferreport,
  expenseCategory
} from './data';
import CustomBreadcrumbs from 'Routes/dashboard/ReuseComponent/CustomBreadcrumbs';
const AdminDashboard = (props) => {
  const {location}= props
  return (
   //  <div>
   //    <h1>Admin  dashboard</h1>
   //    <div className="row">
   //          <div className="col-sm-12 col-md-12 col-lg-12">
   //             <RctCard>
   //                <RctCardContent>
   //                   <TransactionList
   //                      listData={transactionList}
   //                      transferreport={transferreport}
   //                      expenseCategory={expenseCategory}
   //                   />
   //                </RctCardContent>
   //             </RctCard>
   //          </div>
   //       </div>
   //  </div>

   <div className="ecom-dashboard-wrapper">
   <Helmet>
     <title> Admin Dashboard </title>
     <meta name="description" content="user Dashboard" />
   </Helmet>
   <div className="charts-widgets-wrapper">

     {/* <PageTitleBar title={<IntlMessages id="sidebar.adminDashboard" />} match={props.match} /> */}
     <CustomBreadcrumbs    currentPage={"Admin Dashboard"} data={location?.state?.breadcrumbData}  />

     <RctCollapsibleCard
     // heading={<center> <h2>user Dashboard</h2></center> }
     >
      <RctCard>
         <RctCardContent>
            <TransactionList
               listData={transactionList}
               transferreport={transferreport}
               expenseCategory={expenseCategory}
            />
         </RctCardContent>
      </RctCard>
     </RctCollapsibleCard>
     <div>
     </div>
   </div>

 </div>
  )
}

export default AdminDashboard
