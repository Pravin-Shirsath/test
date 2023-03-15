import React from 'react'
import { Button, AppBar, Toolbar  } from '@material-ui/core'

import QueueAnim from 'rc-queue-anim'
import AppConfig from 'Constants/AppConfig';
import { Link } from 'react-router-dom';
import '../Assets/css/main.css'
import {useHistory} from "react-router-dom"


function SelectAnalytics(props) {

  const history = useHistory();


  const goToDashboard = () => {
    props.history.push('/app/dashboard/saas')
  }

  return (
    <QueueAnim type="bottom" duration={2000}>
      <div className="rct-session-wrapper">
      <AppBar position="static" className="session-header">
               <Toolbar>
                  <div className="container">
                     <div className="d-flex justify-content-between">
                        <div className="session-logo">
                           <Link to="/">
                              <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="250" />
                           </Link>
                        </div>
                       
                     </div>
                  </div>
               </Toolbar>
            </AppBar>
        <div className="session-inner-wrapper">
          <div className="container">
            <div className="row row-eq-height" style={{marginTop:'200px'}}>
              <div className="col-6 m-auto">
                <div className="session-body">
                  <div className="session-head mb-30">
                    <h2 className="">Select type of analytics </h2>
                  </div>
                  <div className='d-flex activity_wrap'>
                  <Button
                    variant="contained"
                    className="theme-background text-white w-100"
                    size="large"
                    onClick={goToDashboard}
                    
                  >
                   Forecast
                  </Button>
                  <Button
                    variant="contained"
                    className="theme-background text-white w-100"
                    size="large"
                    onClick={goToDashboard}
                  >
                    Impactable Sales
                  </Button>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </QueueAnim>
  )
}

export default SelectAnalytics
