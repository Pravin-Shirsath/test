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
 
 export default function Reports(props) {
    const { match } = props;
    return (
       <div className="ecom-dashboard-wrapper">
          <Helmet>
             <title>Reports Dashboard</title>
             <meta name="description" content="Automaton Ecommerce Dashboard" />
          </Helmet>
          <RctCollapsibleCard
                colClasses="col-sm-12 col-md-8 col-lg-8 w-xs-full"
                heading={<IntlMessages id="widgets.RecentOrders" />}
                collapsible
                reloadable
                closeable
                fullBlock
             >
               <h1>Sample page </h1>
                </RctCollapsibleCard>
        
          <div className="row">
             <RctCollapsibleCard
                colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                heading={<IntlMessages id="widgets.supportRequest" />}
                collapsible
                reloadable
                closeable
                fullBlock
                customClasses="overflow-hidden"
             >
                <SupportRequest />
             </RctCollapsibleCard>
             <RctCollapsibleCard
                colClasses="col-sm-12 col-md-8 col-lg-8 w-xs-full"
                heading={<IntlMessages id="widgets.RecentOrders" />}
                collapsible
                reloadable
                closeable
                fullBlock
             >
                <RecentOrdersWidget />
             </RctCollapsibleCard>
          </div>
         
       </div>
    )
 }
 