/**
 * Ecommerce Dashboard
 */

import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
// intl messages
import { Card, CardBody } from 'reactstrap';

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
import ChartConfig from 'Constants/chart-config';
import CustomBreadcrumbs from '../ReuseComponent/CustomBreadcrumbs';
import SpacePieChart from 'Components/Charts/SpacePieChart';
import { getChartData } from 'Api';
import { colors } from '@mui/material';
import AppConfig from 'Constants/AppConfig';
// import { useState } from 'react';

export default function Storageused(props) {
   const { match } = props;
   const { location } = props
   const [labels, setLabels] = useState([])
   const [fileSizes, setFileSizes] = useState([])
   const [colorCode, setColorCode] = useState([])
   const [spaceuse, setSpaceused] = useState(null)
   const [message, setMessage] = useState(null)

   


   useEffect(() => {
      GET_CHART_DATA()
   }, [])

   const GET_CHART_DATA = () => {

      const accessToken = JSON.parse(localStorage.getItem('token'))
      if (accessToken !== null) {
         getChartData(accessToken)
            .then((res) => {
               if (res?.status === 200) {
                  const Label = [];
                  const size = [];
                  const colors = []
                 
                  
                  if (res?.data?.projects?.length > 0) {
                     
                     let available_balance = "available_balance"
                     Label.push(available_balance)
                     size.push( Number(res?.data?.available_balance) )
                     colors.push("green")

                     
                    
                     res?.data?.projects.forEach(item => {
                       
                       let color = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';

                        colors.push(color)
                        Label.push(item.project_name)
                        size.push(Number(item.project_size_in_GB))
 
                     });



                     setColorCode(colors)
                     setLabels(Label);
                     setFileSizes(size)
                    
                     console.log(colors,Label,size)
                     setSpaceused({chartData: {
                        labels: Label,
                        datasets: [{
                            data: size,
                            backgroundColor: colors,
                            hoverBackgroundColor: [
                                ChartConfig.color.primary,
                                ChartConfig.color.info
                            ]
                        }]
                    },})
                    setMessage(false)
                  }else{
                     setMessage(true)
                  }


                  console.log('Chart:', res)
               }
            })
            .catch((err) => {
               // console.log('Response from customerlist:', err)
            })
      }
   }


   return (
      <div className="ecom-dashboard-wrapper">
         <Helmet>
            <title>{AppConfig.brandName} |Reports Dashboard</title>
            <meta name="description" content={`${AppConfig.brandName} Widgets`}/>
         </Helmet>
         {/* <PageTitleBar title={<IntlMessages id="sidebar.report" />} match={props.match} /> */}
         <CustomBreadcrumbs currentPage={"Storage Uses"} data={location?.state?.breadcrumbData} />
        {spaceuse !=null && <Space data={spaceuse} />} 

        {message &&  <Card className="rct-block d-flex ">
         <CardBody className="d-flex py-15 align-items-center  justify-content-center">
         <p>No Project Available</p>
            
            
           
         </CardBody>
      </Card> }
      
      
      </div>
   )
}
