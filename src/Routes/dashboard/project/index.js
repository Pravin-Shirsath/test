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
 import { Progress ,Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Col,
	FormFeedback} from 'reactstrap';
 // widgets data
 import {
     visitorsData,
     salesData,
     ordersData,
     topSellingProducts,
     trafficStatus
 } from './data';
import DoughnutChart from 'Components/Charts/DoughnutChart';
 
 export default function Project(props) {
    const { match } = props;
    return (
       <div className="ecom-dashboard-wrapper">
          <Helmet>
             <title>Project Dashboard</title>
             <meta name="description" content="Automaton Ecommerce Dashboard" />
          </Helmet>
          {/* <PageTitleBar title={<IntlMessages id="sidebar.ecommerce" />} match={match} /> */}
             
          <div className="row ">
         {
          [1,2,3].map((item,i)=>{
             return <RctCollapsibleCard
                
                colClasses="col-sm-12 col-md-6 col-lg-4 "
                heading={<section className=""> 
                <h3>Project {i}</h3>
                <p>Created by ABS on 04/03/22</p>
                
                </section>}
                
                fullBlock
                key={i}
             >
             <section className="d-flex flex-direction: column align-items-center justify-content-between px-3">
             <div className="">
               <DoughnutChart />
               </div>
               <div>
                 <h4>Dtaset details <span className="square border border-5 border-dark  px-4 py-1">05</span></h4>
                 <h4 >Status <span className="square border border-5 border-dark  px-3 py-1 bg-info mx-5"></span></h4>
               </div>

             </section>
             <section className="d-flex flex-direction: column align-items-center justify-content-center px-5 py-5 ">
             <Button variant="contained" color="primary" className="text-white mx-5"  >Edit</Button>
             <Button variant="contained" color="primary" className="text-white mx-5"  >view</Button>
             <Button variant="contained" color="danger" className="text-white mx-5"  >delet</Button>

             </section>
              
             </RctCollapsibleCard>
          })
         }
       
            
           
       </div>
        
         
       </div>
    )
 }
 