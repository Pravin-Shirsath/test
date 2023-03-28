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
import { useHistory } from 'react-router';

 
 export default function Account(props) {
   const history = useHistory();
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
         <PageTitleBar title={<IntlMessages id="sidebar.account" />} match={props.match} />
         <RctCollapsibleCard
            heading={<center > <h2>Account</h2></center> }
                 
         >
        <div className="w-100 d-flex justify-content-between px-40"> 
        <h3>Used </h3> <h3>Available </h3>
        </div>

        <div>

         {
            true? <Progress bar color="danger" value={100} style={{ height: "50px" }} ><h2 style={{marginTop:"6px"}}>0GB</h2></Progress>
            :
            <Progress multi style={{ height: "50px" }}>
        <Progress bar color="danger" value={useData} ><h2 style={{marginTop:"6px"}}>{useData}GB</h2></Progress>
        <Progress bar color="success" value={totalData-useData}  ><h2 style={{marginTop:"6px"}}>{totalData-useData}GB </h2></Progress>
      </Progress>
         }
       
        </div>
            <div className="d-flex justify-content-center mt-50">
              
               <h2>{str.askRechargeText} <span className="mx-5 font-weight-bold ">{str.recharge} ?</span></h2>
               
            </div>
            <div className=" d-flex justify-content-center" style={{marginTop:"30px"}}>

            <FormGroup tag="fieldset" className="d-flex justify-content-between my-100 " >
                       
                        <FormGroup check className="d-flex align-item-center mx-50">
                        <Input type="radio" name="radio1" style={{width:"30px" ,height:"30px"}} onClick={()=> history.push("/app/dashboard/rechargeModal")} />
          <Label check className="mx-20  mt-10">
             Yes
          </Label>
        </FormGroup>
            
        <FormGroup check className="d-flex align-item-center mx-50">
                        <Input type="radio" name="radio1" style={{width:"30px" ,height:"30px"}} onClick={()=> history.push("/app/dashboard/saas")} />
          <Label check className="mx-20 mt-10">
             No
          </Label>
        </FormGroup>
                     </FormGroup>
            </div>
         </RctCollapsibleCard>

 
      </div>
         
       </div>
    )
 }
 