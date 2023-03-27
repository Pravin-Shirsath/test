/**
 * Gallery
 */
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
// // api
// import api from 'Api';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// intl messages
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import { getAdminList } from 'Api';

import { Link, useHistory } from 'react-router-dom';


function CompareModals(props) {
   const history = useHistory();

   useEffect(()=> {
      // const isLoggedInBool = localStorage.getItem("isLoggedIn")
      // if(isLoggedInBool !== "true"){
      //    history.push("/login")
      //    localStorage.clear();
      // }

      //== using adminlist api as dummy for token validation ===//
     
      const accessToken = JSON.parse(localStorage.getItem('token'))
   //  condinal rendring
    
      // if (accessToken !== null) {
      //    getAdminList(accessToken, "1")
      //    .then((res) => {
      //    })
      //    .catch((err) => {
      //       console.log("status of invalid token", err?.response?.data, err?.response?.status)
      //       if(err?.response?.status == 401){
      //          localStorage.clear();
      //          history.push("/login");
      //          // window.location.reload();
      //       } else {
      //          console.log('Response from createmdodal:', err)
      //       }
      //    })
      // }
   }, [])

   return (
      <div className="blank-wrapper">
         <Helmet>
            <title>Automaton | Compare models</title>
            <meta name="description" content="Automaton widgets" />
         </Helmet>
         <PageTitleBar title={<IntlMessages id="sidebar.modal3" />} 
          match={props.match} />
        <div className="row d-flex justify-content-center align-items-center model-form">
         <div className="col-sm-12 col-md-12 col-xl-12">
               <RctCollapsibleCard>
                  <h1>Compare Models Component</h1>
               </RctCollapsibleCard>
            </div>
         </div>

      </div>
   );
}

export default CompareModals;
