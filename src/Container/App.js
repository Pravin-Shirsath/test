/**
 * App.js Layout Start Here
 */
import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
// rct theme provider
import RctThemeProvider from './RctThemeProvider';
//Horizontal Layout
import HorizontalLayout from './HorizontalLayout';
//Agency Layout
import AgencyLayout from './AgencyLayout';
//Main App
import RctDefaultLayout from './DefaultLayout';
// boxed layout
import RctBoxedLayout from './RctBoxedLayout';
// CRM layout
import CRMLayout from './CRMLayout';
// app signin
import AppSignIn from './SigninFirebase';
import AppSignUp from './SignupFirebase';
import Forgotpwd from "../Routes/session/forgot-password/index";
import ConfirmPassword from "../Routes/session/confirm-password/ConfirmPassword";
import SelectActivity from './SelectActivity';
import SelectAnalytics from './SelectAnalytics';

import { getAdminList } from 'Api';


// async components
import {
   AsyncSessionLoginComponent,
   AsyncSessionRegisterComponent,
   AsyncSessionLockScreenComponent,
   AsyncSessionForgotPasswordComponent,
   AsyncSessionPage404Component,
   AsyncSessionPage500Component,
   AsyncTermsConditionComponent
} from 'Components/AsyncComponent/AsyncComponent';


//Auth0
import Auth from 'Auth/Auth';
// callback component
import Callback from "Components/Callback/Callback";
import LogIn from './LogIn';
import SelectModules from './SelectModules';
//Auth0 Handle Authentication
const auth = new Auth();
const handleAuthentication = ({ location }) => {
   if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
   }
}

/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, authUser, ...rest }) =>
   <Route
      {...rest}
      render={props =>
         authUser
            ? <Component {...props} />
            : <Redirect
               to={{
                  pathname: '/login',
                  state: { from: props.location }
               }}
            />}
   />;

function App(props) {
   const history = useHistory();

   const authUser = useSelector(state => state.authUser);

   const { user } = authUser;
   const { location, match } = props; 
    console.log(authUser,props)
   const accessToken = JSON.parse(localStorage.getItem('token'))

   //======== UNSTABLE FUNCTION, able to logout from other browser when logout from first, but have some problems =====//
   //================== works only when not subscribed to anything, i.e; without second parameter =====================//
   // useEffect(()=> {
   //    //== using adminlist api as dummy for token validation ===//
   //    const accessToken = JSON.parse(localStorage.getItem('token'))
   //    if (accessToken !== null) {
   //       getAdminList(accessToken, "1")
   //       .then((res) => {
   //          <Redirect to={'/app/dashboard/saas'} />
   //       })
   //       .catch((err) => {
   //          console.log("status of invalid token from app.js", err?.response?.data, err?.response?.status)
   //          if(err?.response?.status == 401){
   //             localStorage.clear();
   //             history.push("/login");
   //             console.log("redirecting to sign-in bcause of this run in app.js")
   //          } else {
   //             console.log('Response from :', err)
   //          }
   //       })
   //    }
   // })
// conditional rendring


const type = JSON.parse(localStorage.getItem('user_type'));
   
   if (location.pathname === '/') {
      if (user === null && accessToken === null) {
         return (<Redirect to={'/login'} />);
      } else {
          
          if(type === "customer"  || type === "company_admin"){
             return (  <Redirect to={'/app/dashboard/saas'} /> );
          }else  if(type === "admin"){

            return (  <Redirect to={'/app/dashboard/Admin/Dashboard'} /> );
         }
      }
   }
   return (
      <RctThemeProvider>
         <NotificationContainer />
         <InitialPath
            path={`${match.url}app`}
            authUser={user}
            component={RctDefaultLayout}
         />
         <Route path="/horizontal" component={HorizontalLayout} />
         <Route path="/agency" component={AgencyLayout} />
         <Route path="/boxed" component={RctBoxedLayout} />
         <Route path="/dashboard" component={CRMLayout} />
         {/* <Route path="/login" component={AppSignIn} /> */}
         <Route path="/signup" component={AppSignUp} />
         <Route path="/forgotpwd" component={Forgotpwd} />
         <Route path="/confirm-password" component={ConfirmPassword} />
         <Route path="/session/login" component={AsyncSessionLoginComponent} />
         <Route path="/session/register" component={AsyncSessionRegisterComponent} />
         <Route path="/session/lock-screen" component={AsyncSessionLockScreenComponent} />
         <Route path="/selectactivity" component={SelectActivity} />
         <Route path="/selectanalytics" component={SelectAnalytics} />
         <Route path="/selectmodules" component={SelectModules} />

         <Route
            path="/session/forgot-password"
            component={AsyncSessionForgotPasswordComponent}
         />
         <Route path="/login" component={LogIn} />
         <Route path="/session/404" component={AsyncSessionPage404Component} />
         <Route path="/session/500" component={AsyncSessionPage500Component} />
         <Route path="/terms-condition" component={AsyncTermsConditionComponent} />
         <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
         }} />
      </RctThemeProvider>
   );
}

export default App;
