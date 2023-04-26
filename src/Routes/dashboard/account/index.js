/**
 * Ecommerce Dashboard
 */

 import React,{useEffect,useState} from 'react'
 import { Helmet } from "react-helmet";
 import "./Account.css"
 import { Progress ,Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Col,
	FormFeedback} from 'reactstrap';



// main css
import "../../../Assets/css/main.css"

 // rct collapsible card

 
 
 
 // widgets data

import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { str } from 'Constants/stringConst';
import { UserAccountStatus } from 'Api';
import { useHistory } from 'react-router';
import CustomBreadcrumbs from '../ReuseComponent/CustomBreadcrumbs';

 
 export default function Account(props) {
   const history = useHistory();
    const { match } = props;
    const {location}=props
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
                  setUseData(Number(Udata))
                }

               if(Tdata) {
              
              setTotalData(Number(Tdata))
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


console.log(totalData,useData,totalData-useData,"totalData-useData")

    return (
       <div className="ecom-dashboard-wrapper">
          <Helmet>
             <title>Account Dashboard</title>
             <meta name="description" content="" />
          </Helmet>
         
        
          <div className="charts-widgets-wrapper">
         {/* <PageTitleBar title={<IntlMessages id="sidebar.account" />} match={props.match} /> */}
         <CustomBreadcrumbs    currentPage={"Account"} data={location?.state?.breadcrumbData}  />

         <RctCollapsibleCard 
         customClasses="py-10"
          >
            <section className="d-flex justify-content-center align-item-center"><p className="Comman-Heading ">Account</p></section>
         <section>
        <d iv className="w-100 d-flex justify-content-center align-item-center"> 
        <div className=" account-data-available  globalFontFamily  ">
        <h3>Used </h3> <h3>Available </h3>
        </div> 
        </d>
       
        <div className="d-flex justify-content-center ">
      
         {
            totalData == 0 ? <Progress bar color="danger" className="account-Progressbar progress-bar progress-bar-striped progress-bar-animated"> <p className="account-gb-text" >0GB</p></Progress>
            :
            <Progress multi   className="account-Progressbar" >
               <Progress bar color="danger" value={useData *(100/totalData) } className="progress-bar progress-bar-striped progress-bar-animated" ><p className="account-gb-text "  >{useData.toFixed(3)}GB</p></Progress>
               <Progress bar color="success" value={(totalData-useData)*(100/totalData)}   className="progress-bar progress-bar-striped progress-bar-animated" > <p className="account-gb-text" >{(totalData-useData).toFixed(3)}GB </p></Progress>
            </Progress>
         }
       
        </div>
        </section>
            <div className="d-flex justify-content-center ">
              
               <h2 className='account-recharge-text'>{str.askRechargeText} ?</h2>
               
            </div>
            <div className=" d-flex justify-content-center mt-5" >

            <FormGroup tag="fieldset" className="d-flex justify-content-between acoount-radio-box m-0" >
                        <FormGroup check className="d-flex align-item-center ">
                        <Input type="radio" name="radio1" style={{width:"30px" ,height:"30px"}} onClick={()=> history.push("/app/dashboard/rechargeModal")} />
          <Label check className="mx-20  mt-10  globalFontFamily">
             Yes
          </Label>
        </FormGroup>
            
        <FormGroup check className="d-flex align-item-center acoount-radio-box ">
                        <Input type="radio" name="radio1" style={{width:"30px" ,height:"30px"}} onClick={()=> history.push("/app/dashboard/saas")} />
          <Label check className="mx-20 mt-10  globalFontFamily">
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
 

//  esmrp.csb.app