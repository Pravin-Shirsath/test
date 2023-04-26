import React, { useEffect, useState } from 'react'
import '../Assets/css/main.css'
import { Helmet } from 'react-helmet'
import AutomataIcon from '../Assets/img/Automata.png'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { getModulesLiks } from 'Api';
import { Link, useHistory } from 'react-router-dom';
import AppConfig from 'Constants/AppConfig';

const SelectModules = () => {

  const [URLData, setURLData] = useState();
  const [URLLink , setURLLink ] = useState();
  const [userType, setUserType] = useState("");
  const history = useHistory();



  useEffect(() => {
    getURLs();
    const user_type =JSON.parse( localStorage.getItem("user_type"))
    setUserType(user_type);
  }, [])


  const navigateToDashbaord = () => {
   
    if(userType === "admin") {
      history.push("app/dashboard/Admin/Dashboard");
    }

    if(userType === "customer" || userType === "company_admin") {
      history.push('/app/dashboard/saas');    
    }
    // alert("rr",JSON.stringify({userType:userType}))
  }



  const getURLs = () => {
    getModulesLiks().then((res) => {
      if (res?.status == 200 ) {
        console.log("Modules Link", res);
        setURLData(res?.data?.results);
      }
    }).catch(err => {
      console.log("err:", err)

    });
  }

  const setVideoLink = (text) => {
    const currentURL = URLData.find(URLData => URLData.text === text);
    console.log(currentURL?.link , "currentURL")
    // window.open(currentURL?.link, "_blank");
    setURLLink(currentURL?.link);

  }


  return (
    <div className='loginContainer moduleBackground'>
      <Helmet>
        <title> {AppConfig.brandName} | Projects </title>
        <meta name="description" content={`${AppConfig.brandName} Widgetse`} />
      </Helmet>
      <div className='row justify-content-between  align-items-center'>
        <div className='col'>
          <h1 className='dashboard-title'>“ No one is ever ready for big challenges....BE MORE. DO MORE. #HelloGeo</h1>
        </div>
        <div className='col moduleWRapper'>
          <div className='mobuleSection position-relative'>
            <img src={AutomataIcon} alt='automataLogo' width="188" height="80" />
            <h4> Project Planning </h4>
            <div className='moduleLink' onClick={() => setVideoLink("Project Planning")} > <a href={URLLink} target="_blank"> <ArrowForwardOutlinedIcon /> </a></div>
          </div>
          <div className='mobuleSection'>
            <img src={AutomataIcon} alt='automataLogo' width="188" height="80" />
            <h4> Processing Hub </h4>
            <div className='moduleLink' onClick={navigateToDashbaord}> <a> <ArrowForwardOutlinedIcon /> </a></div>

          </div>
          <div className='mobuleSection'>
            <img src={AutomataIcon} alt='automataLogo' width="188" height="80" />
            <h4> AI Studio </h4>
            <div className='moduleLink' onClick={() => setVideoLink("AI Studio")}> <a href={URLLink} target="_blank"> <ArrowForwardOutlinedIcon /> </a></div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SelectModules