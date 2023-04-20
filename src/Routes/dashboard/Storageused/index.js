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
    Notes,
    Space
} from "Components/Widgets";

// widgets data

import {
   spaceUsed
} from './data';

import CustomBreadcrumbs from '../ReuseComponent/CustomBreadcrumbs';
import SpacePieChart from 'Components/Charts/SpacePieChart';

export default function Storageused(props) {
   const { match } = props;
   const {location}=props
   return (
      <div className="ecom-dashboard-wrapper">
         <Helmet>
            <title>Reports Dashboard</title>
            <meta name="description" content="Automaton Ecommerce Dashboard" />
         </Helmet>
         {/* <PageTitleBar title={<IntlMessages id="sidebar.report" />} match={props.match} /> */}
         <CustomBreadcrumbs  currentPage={"Storage Uses"} data={location?.state?.breadcrumbData}  />
       <Space  data={spaceUsed} />
      </div>
   )
}
