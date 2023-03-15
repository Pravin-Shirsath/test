/**
 * Sign Up page (Register)
 */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, LinearProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import QueueAnim from 'rc-queue-anim';



// app config
import AppConfig from 'Constants/AppConfig';

// redux action
import {
   signupUserInFirebase,
} from 'Store/Actions';

function SignupFirebase(props){
   const [name,setName] = useState('');
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');
   const dispatch = useDispatch();
   const loading = useSelector(state => state.authUser);
   /**
    * On User Signup
    */
   const onUserSignUp = () => {
      if (email !== '' && password !== '') {
         dispatch(signupUserInFirebase({ email, password }, props.history));
      }
   }

   return (
      <QueueAnim type="bottom" duration={2000}>
         <div className="rct-session-wrapper">
            {loading &&
               <LinearProgress />
            }
            <AppBar position="static" className="session-header">
               <Toolbar>
                  <div className="container">
                     <div className="d-flex justify-content-between">
                        <div className="session-logo">
                           <Link to="/">
                              <img src={AppConfig.appLogo} alt="session-logo"  style={{width:'18%'}} width="172" />
                           </Link>
                        </div>
                        <div className='d-flex align-items-center'>
                           <Link to="/signin" className="mr-15 text-primary">Already have an account?</Link>
                           <Button component={Link} to="/signin" variant="contained" className="btn-primary">Sign In</Button>
                        </div>
                     </div>
                  </div>
               </Toolbar>
            </AppBar>
            <div className="session-inner-wrapper">
               <div className="container">
                  <div className="row row-eq-height justify-content-center" style={{marginTop:'150px'}}>
                     <div className="col-sm-7 col-md-7 col-lg-8">
                        <div className="session-body text-center">
                           <div className="session-head mb-15">
                              <h2>Get started with {AppConfig.brandName}</h2>
                           </div>
                           <Form>
                              <FormGroup className="has-wrapper">
                                 <Input type="text" value={name} name="user-name" id="user-name" className="has-input input-lg" placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)} />
                                 <span className="has-icon"><i className="ti-user"></i></span>
                              </FormGroup>
                              <FormGroup className="has-wrapper">
                                 <Input type="mail" value={email} name="user-mail" id="user-mail" className="has-input input-lg" placeholder="Enter Email Address" onChange={(e) => setEmail(e.target.value)} />
                                 <span className="has-icon"><i className="ti-email"></i></span>
                              </FormGroup>
                              <FormGroup className="has-wrapper">
                                 <Input value={password} type="Password" name="user-pwd" id="pwd" className="has-input input-lg" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                 <span className="has-icon"><i className="ti-lock"></i></span>
                              </FormGroup>
                              <FormGroup className="mb-15">
                                 <Button
                                    className="btn-info text-white btn-block w-100"
                                    variant="contained"
                                    size="large"
                                    onClick={() => onUserSignUp()}>
                                    Sign Up
                           </Button>
                              </FormGroup>
                           </Form>
                       
                        </div>
                     </div>
                    
                  </div>
               </div>
            </div>
         </div>
      </QueueAnim>
   );
}

export default SignupFirebase;
