/**
 * Ecommerce Dashboard
 */

 import React,{useEffect,useState} from 'react'
 import { Helmet } from "react-helmet";

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
import { UserAccountStatus } from 'Api';

 
 export default function Account(props) {
    const { match } = props;
const[ Accout,setAccout]=useState()
const[ useData,setUseData]=useState(0)
const[ totalData,setTotalData]=useState(0)


const GetAccountStatus=()=>{
   const accessToken = JSON.parse(localStorage.getItem('token'))
   if (accessToken !== null) {
   UserAccountStatus(accessToken).then((res)=>{
      if (res?.status === 200) {
         if(res?.data){
            setAccout(res?.data)
            const Tdata=res?.data["total_allowed_size"]
            const Udata=res?.data["total_size_consumed"]
                if(Udata){
                  setUseData(parseInt(Udata))
                }

               if(Tdata) {
              
              setTotalData(parseInt(Tdata))
           }
         }
       } else {
        
       }
   })
}
}


useEffect(()=>{


   GetAccountStatus()


},[])


    return (
       <div className="ecom-dashboard-wrapper">
          <Helmet>
             <title>Account Dashboard</title>
             <meta name="description" content="" />
          </Helmet>
         
        
          <div className="charts-widgets-wrapper">
         {/* <PageTitleBar title={<IntlMessages id="sidebar.charts" />} match={props.match} /> */}
         <RctCollapsibleCard
            heading={<center > <h2>Account</h2></center> }
                 
         >
        <div className="w-100 d-flex justify-content-between px-40"> 
        <h3>Used </h3> <h3>Available </h3>
        </div>

        <div>
        <Progress multi style={{ height: "50px" }}>
        <Progress bar color="danger" value={useData} ><h2 style={{marginTop:"6px"}}>{useData}GB</h2></Progress>
        <Progress bar color="success" value={totalData-useData}  ><h2 style={{marginTop:"6px"}}>{totalData-useData}GB </h2></Progress>
      </Progress>
        </div>
            <div className="d-flex justify-content-center mt-50">
              
               <h2>{str.askRechargeText} <span className="mx-5 font-weight-bold ">{str.recharge} ?</span></h2>
               
            </div>
            <div className=" d-flex justify-content-center" style={{marginTop:"30px"}}>

            <FormGroup tag="fieldset" className="d-flex justify-content-between my-100 " >
                       
                        <FormGroup check className="d-flex align-item-center mx-50">
                        <Input type="radio" name="radio1" style={{width:"30px" ,height:"30px"}} />
          <Label check className="mx-20  mt-10">
             Yes
          </Label>
        </FormGroup>
            
        <FormGroup check className="d-flex align-item-center mx-50">
                        <Input type="radio" name="radio1" style={{width:"30px" ,height:"30px"}} />
          <Label check className="mx-20 mt-10">
             No
          </Label>
        </FormGroup>
                     </FormGroup>
            </div>
         </RctCollapsibleCard>

 {/* <RctCollapsibleCard
                customClasses="trafic-bar-chart"
                colClasses="col-sm-12 col-md-12 col-lg-5 d-sm-full"
                heading={<IntlMessages id="widgets.overallTrafficStatus" />}
                collapsible
                reloadable
                closeable
                fullBlock
             >
                <OverallTrafficStatusWidget
                   chartData={trafficStatus}
                />
             </RctCollapsibleCard> */}

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
 