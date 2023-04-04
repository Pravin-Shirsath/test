import "./recharge.css"

/**
 * User Management Page
 */
import React, { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet'

import { Link, useHistory } from 'react-router-dom';
 
// page title bar
import PageTitleBar from '../../../Components/PageTitleBar/PageTitleBar'
// intl messages
import IntlMessages from '../../../Util/IntlMessages'
// rct card box
import RctCollapsibleCard from '../../../Components/RctCollapsibleCard/RctCollapsibleCard'
// rct section loader
import RctSectionLoader from '../../../Components/RctSectionLoader/RctSectionLoader'
import '../../../Assets/css/user.css'

import {
  Progress, Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  FormFeedback, CustomInput
} from 'reactstrap';
import { GetRechargedPlan } from "Api";

export default function Recharge(props) {
  const history = useHistory();

  const [loading, setLoading] = useState(false)
  const [recharge, setRecharge] = useState([])
  const [filteredRecharges, setFilteredRecharges] = useState([])
  const [totalPageCount, setTotalPageCount] = useState(0)
  const [selectedPlan,setSelectedPlan]=useState(null)
 
  const [additionalspace,setAdditionalspace]=useState(0)
  const [paybleAmount,setPaybleAmount]=useState(0)
  const [amountTotal,setAmountTotal]=useState(0)



  useEffect(() => {
    const isLoggedInBool = localStorage.getItem("isLoggedIn")
    RechargePlan()
  }, [])

  

 
  const RechargePlan = () => {
    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
      GetRechargedPlan(accessToken, 1)
        .then((res) => {
          if (res?.status === 200) {


            if(res?.data?.results){
              if(res?.data?.results != undefined){
                if(res?.data?.results.length == 1){
                  setSelectedPlan(res?.data?.results[0])
                }
              }
            }
           
            setRecharge(res?.data?.results);
            console.log('Response fromRecharged list :', res)

          } else {
            console.log('Response from fromRecharged:', res)
          }
        })
        .catch((err) => {
          // console.log("status of invalid token", err?.response?.data, err?.response?.status)
          if (err?.response?.status == 401) {
            // conditional rendring
            // localStorage.clear();
            // history.push("/login");
            // window.location.reload();
          } else {
            // console.log('Response from customerlist:', err)
          }
        })
    }
  }


 
  
  const AddspceEvent=(e)=>{
    console.log(e ,typeof(e))
    if(e != "NaN"){

      setAdditionalspace(parseInt(e))
      if(selectedPlan){
    
        setAmountTotal(parseInt(e)* parseInt(selectedPlan?.per_gb_rate) )
      }
    }else{
      alert("f")
    }
  }

  return (
    <div className="user-management">
      <Helmet>
        <title>Automaton | Customers List</title>
        <meta name="description" content="Automaton Widgets" />
      </Helmet>
      <PageTitleBar
        title={<IntlMessages id="sidebar.recharge" />}
        match={props.match}
      />




<div className="row ">
            {filteredRecharges &&
              filteredRecharges.map((item, i) => {
 
              
                return <RctCollapsibleCard

                  colClasses="col-sm-12 col-md-3 col-lg-3  rounded"

                  fullBlock
                  key={i}
                >
                  <div className="shadow project-card-shadow">
                    <section className="bg-primary text-white px-3 shadow rounded d-flex  align-items-center py-3 ">
                     <div className="ml-4  align-items-center ">
                        
                        <h2 className="">{item?.subscription_name} </h2>
                        <h3>{item.per_gb_rate} ₹ / GB </h3>
                      </div>
                    </section>
                 

                  </div>

                </RctCollapsibleCard>
              })
            }

            
          </div>















      <RctCollapsibleCard fullBlock>
        <div className="table-responsive dark-primary-text">
          <div className='rechargeBoxContainer'>
            <div className="heading dark-primary">
              <h1>Recharge</h1>
            </div>

            <div className="firstRow recharge-modal-row light-primary">
              <div className="left">
                <p className="wrapper"><p className="text">Additional Space</p> <p className="inputMaterial"><input type="number" onChange={(e)=>AddspceEvent(e.target.value)}/> GB <span className="diff">@{selectedPlan?.per_gb_rate} ₹ / GB</span></p></p>
              </div>

              <div className="mid"><p>=</p></div> 

              <div className="right"><p>{amountTotal} = 00</p></div>
            </div>

            <div className="secondRow recharge-modal-row light-primary">
              <div className="left">
                <p><span className="inputContainer"><input /></span> <Button color="primary" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>Apply Coupon</Button></p>
              </div>

              <div className="mid">
                <p>=</p>
              </div>

              <div className="right"><p><span className="operator">-</span>30 = 00</p></div>
            </div>

            <div className="thirdRow recharge-modal-row light-primary">
              <div className="left"></div>

              <div className="mid"></div>

              <div className="right">
                <p>220 = 00</p>
              </div>
            </div>

            <div className="fourthRow recharge-modal-row light-primary">
              <p>
                Net Payable <span>{"220"}</span>
              </p>
            </div>

            <div className="fifthRow recharge-modal-row light-primary">
              <p>
                <Button color="primary" style={{padding:"10px 50px"}}>Proceed To Checkout</Button>
              </p>
            </div>
          </div>
        </div>
        {loading && <RctSectionLoader />}
      </RctCollapsibleCard>
    </div>
  )
}
