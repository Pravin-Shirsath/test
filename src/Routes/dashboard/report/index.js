/**
 * Ecommerce Dashboard
 */

 import React from 'react'
 import { Helmet } from "react-helmet";
 // intl messages
 import IntlMessages from 'Util/IntlMessages';
 
 // page title bar
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
 
 // rct collapsible card
 import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
 
 import {
     VisitorAreaChartWidget,
     SalesAreaChartWidget,
     OrdersAreaChartWidget,
     RecentOrdersWidget,
     SupportRequest,
     Notifications,
     TopSellingWidget,
     OverallTrafficStatusWidget,
     ProductReportsWidget,
     OnlineVisitorsWidget,
     TodayOrdersStatsWidget,
     BookingInfo,
     NewOrderCountdown,
     FollowersWidget,
     Notes
 } from "Components/Widgets";
 
 // widgets data
 import {
     visitorsData,
     salesData,
     ordersData,
     topSellingProducts,
     trafficStatus
 } from './data';
import CustomBreadcrumbs from '../ReuseComponent/CustomBreadcrumbs';
import AppConfig from 'Constants/AppConfig';
 
 export default function Reports(props) {
    const { match } = props;
    const {location}=props
    return (
       <div className="ecom-dashboard-wrapper">
          <Helmet>
             <title> {AppConfig.brandName} | Reports Dashboard</title>
             <meta name="description" content={`${AppConfig.brandName} Widgets`} />
          </Helmet>
          {/* <PageTitleBar title={<IntlMessages id="sidebar.report" />} match={props.match} /> */}
          <CustomBreadcrumbs    currentPage={"Report"} data={location?.state?.breadcrumbData}  />
         
       </div>
    )
 }
 