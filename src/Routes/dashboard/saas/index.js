/**
 * Ecommerce Dashboard
 */

 import React ,{useEffect}from 'react'
 import { Helmet } from "react-helmet";
//  import Button from '@material-ui/core/Button';
 import { Progress ,Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Col,
	FormFeedback} from 'reactstrap';




// intl messages
import IntlMessages from '../../../Util/IntlMessages';





 
 // rct collapsible card

 
 
 
 // widgets data
 import {
     visitorsData,
     salesData,
     ordersData,
     topSellingProducts,
     trafficStatus
 } from './data';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { str } from 'Constants/stringConst';
import { OverallTrafficStatusWidget, SupportRequest } from 'Components/Widgets';
import ProjectCard from '../ReuseComponent/ProjectCard';
import DoughnutChart from 'Components/Charts/DoughnutChart';
import { useHistory } from 'react-router';

 
 export default function SaasDashbaord(props) {
    const { match } = props;
    const history = useHistory();
   
    const type = JSON.parse(localStorage.getItem('user_type'));
    if(type === "admin"){
      
      history.push("app/dashboard/Admin/Dashboard")
    }





   //  alert("hello")
    useEffect(() => {

     
      console.log("type", type);
    }, [])
     return (
       <div className="ecom-dashboard-wrapper">
          <Helmet>
             <title> User Dashboard </title>
             <meta name="description" content="user Dashboard" />
          </Helmet>
          <div className="charts-widgets-wrapper">
         {/* <PageTitleBar title={<IntlMessages id="sidebar.charts" />} match={props.match} /> */}
         <RctCollapsibleCard
            // heading={<center> <h2>user Dashboard</h2></center> }
                
         >
       <div className="d-flex pb-20 px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
               <div className='search-row'>
                  <input type="text" placeholder='Search' className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} />
                  <Button variant="contained" color="primary" className="text-white mx-5"  >Search</Button>
               </div>

               {/* <Button variant="contained" color="primary" className="text-white mx-5"  
               // onClick={(e) => opnAddNewUserModal(e)} 

               >Add New Customer</Button> */}

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
      
 

         {/* <div className="row">
            
            <RctCollapsibleCard
               heading={<IntlMessages id="widgets.trafficChannel" />}
               customClasses="overflow-hidden"
               colClasses="col-sm-6 col-md-4 w-xs-half-block"
               badge={{
                  name: <IntlMessages id="widgets.today" />,
                  class: 'danger'
               }}
               collapsible
               reloadable
               closeable
               fullBlock
            >
              
            </RctCollapsibleCard>
            <RctCollapsibleCard
               heading={<IntlMessages id="widgets.campaignPerformance" />}
               colClasses="col-sm-6 col-md-4 w-xs-full"
               collapsible
               reloadable
               closeable
            >
             
            </RctCollapsibleCard>
         </div>
          */}
         {/* <div className="row">
            <RctCollapsibleCard
               colClasses="col-sm-12 col-md-5 col-lg-5 col-xl-4 w-8-full"
               heading={<IntlMessages id="widgets.emailsStatistics" />}
               customClasses="gradient-primary"
               collapsible
               reloadable
               closeable
               fullBlock
            >
              
            </RctCollapsibleCard>
            <RctCollapsibleCard
               colClasses="col-sm-12 col-md-7 col-lg-7 col-xl-8 w-8-full"
               heading={<IntlMessages id="widgets.totalEarns" />}
               collapsible
               fullBlock
               reloadable
               closeable
            >
             
            </RctCollapsibleCard>
         </div> */}
         {/* <div className="row">
            <div className="col-sm-12 col-md-6">
             
            </div>
            <div className="col-sm-12 col-md-6">
             
            </div>
         </div> */}
         {/* <div className="row">
            <RctCollapsibleCard
               colClasses="col-md-7 col-xl-8 w-xs-half-block w-8-full"
               heading={<IntlMessages id="widgets.productStats" />}
               collapsible
               reloadable
               closeable
            >
              
            </RctCollapsibleCard>
            <RctCollapsibleCard
               customClasses="gradient-primary"
               colClasses="col-md-5 col-xl-4 w-xs-half-block w-8-full"
               heading={<IntlMessages id="widgets.emailsStatistics" />}
               collapsible
               reloadable
               closeable
               fullBlock
            >
              
            </RctCollapsibleCard>
         </div>
         <div className="row">
            <RctCollapsibleCard
               colClasses="col-sm-12 col-md-6 w-xs-full"
               heading={<IntlMessages id="widgets.siteVisitors" />}
               collapsible
               reloadable
               closeable
               fullBlock
            >
            
            </RctCollapsibleCard>
         </div> */}
      </div>
         
       </div>
    )
 }
 