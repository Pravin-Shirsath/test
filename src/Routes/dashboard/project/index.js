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
          <RctCollapsibleCard
            // heading={<center> <h2>user Dashboard</h2></center> }
                
         >
       <div className="d-flex pb-20 px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
               <div className='search-row'>
                  <input type="text" placeholder='Search' className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} />
                  <Button variant="contained" color="primary" className="text-white mx-5"  >Search</Button>
               </div>

               <Button variant="contained" color="primary" className="text-white mx-5"  
               // onClick={(e) => opnAddNewUserModal(e)} 

               >Create Project</Button>

            </div>


         </RctCollapsibleCard>
        
          <div className="row ">
         {
          [1,2,3].map((item,i)=>{
             return <RctCollapsibleCard
                
                colClasses="col-sm-12 col-md-6 col-lg-4 shadow p-3 mb-5  rounded"
                              
                fullBlock
                key={i}
             >
           
                <section className="dark-primary text-white px-2 py-2 shadow p-3 mb-5 rounded"> 
                <h3>Project {i}</h3>
                <p>Created by ABS on 04/03/22</p>
                
                </section>
             <section className="d-flex flex-direction: column align-items-center justify-content-between px-3 mt-2">
             <div className="">
               <DoughnutChart />
               </div>
               <div>
                 <h4>Dataset Details <span className="square border border-5 border-dark  px-4 py-1">05</span></h4>
                 <h4 >Status <span className="square border border-5 border-dark  px-3 py-1 bg-info mx-5"></span></h4>
               </div>

             </section>
             <section className="d-flex flex-direction: column align-items-center justify-content-center px-5  " style={{marginBottom:"30px",marginTop:"10px"}}>
             <Button variant="contained" color="primary" className="text-white mx-5"  >Edit</Button>
             <Button variant="contained" color="primary" className="text-white mx-5"  >View</Button>
             <Button variant="contained" color="danger" className="text-white mx-5"  >Delete</Button>

             </section>
              
             </RctCollapsibleCard>

          })
         }
       
            
           
       </div>
        
         
       </div>
    )
 }
 