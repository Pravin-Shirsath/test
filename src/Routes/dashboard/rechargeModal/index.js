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

export default function Recharge(props) {
  const history = useHistory();

  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const isLoggedInBool = localStorage.getItem("isLoggedIn")
  }, [])

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
      <RctCollapsibleCard fullBlock>
        <div className="table-responsive dark-primary-text">
          <div className='rechargeBoxContainer'>
            <div className="heading dark-primary">
              <h1>Recharge</h1>
            </div>

            <div className="firstRow recharge-modal-row light-primary">
              <div className="left">
                <p className="wrapper"><p className="text">Additional Space</p> <p className="inputMaterial"><input /> GB <span className="diff">@50/GB</span></p></p>
              </div>

              <div className="mid"><p>=</p></div> 

              <div className="right"><p>250 = 00</p></div>
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
