import { AccountStatus, UserAccountStatus } from 'Api';
import React, { useEffect, useState } from 'react'

import {
  Progress, Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  FormFeedback
} from 'reactstrap';
import { Helmet } from "react-helmet";
import IntlMessages from '../../../../Util/IntlMessages';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { str } from 'Constants/stringConst';
import { BASE_URL } from 'Api/APIConst';
import Table from "./Table"
const CustomerDetails = (props) => {

  const { location } = props
  console.log(location,">>>>>>>")

  const [Accout, setAccout] = useState()
  const [useData, setUseData] = useState(0)
  const [totalData, setTotalData] = useState(0)


  const GetAccountStatus = () => {
    const accessToken = JSON.parse(localStorage.getItem('token'))
    const id = location?.state?.id
    if (accessToken !== null) {
      AccountStatus(accessToken,id).then((res) => {
        if (res?.status === 200) {
          if (res?.data) {
            setAccout(res?.data)
            const Tdata = res?.data["total_allowed_size"]
            const Udata = res?.data["total_size_consumed"]
            if (Udata) {
              setUseData(parseInt(Udata))
            }

            if (Tdata) {

              setTotalData(parseInt(Tdata))
            }
          }
        } else {

        }
      })
    }
  }

  useEffect(() => {


    GetAccountStatus()


  }, [])

  return (
    <div className="ecom-dashboard-wrapper">
      <Helmet>
        <title>Custoumer Details</title>
        <meta name="description" content="" />
      </Helmet>


      <div className="charts-widgets-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.account" />} match={props.match} />

        <RctCollapsibleCard
         

        >
          {/* user Profile Start */}

          <div className="profile-content">
            <div className="media d-flex justify-content-center align-items-center">
              <div style={{ position: "relative" }}>
                <img src={location?.state?.profile_image == null ? `${process.env.PUBLIC_URL}/assets/images/avatars/user-15.jpg` : `${BASE_URL + location?.state?.profile_image}`} alt="user profile" className="rounded-circle bordered" width="90" height="90" />
              </div>
              <div className="media-body">
                <div className="d-flex flex-column align-items-baseline">
                  {/* <h2 className="user-name text-white">{profileData?.first_name} {profileData?.last_name}</h2> */}
                  <h2>{location?.state?.username}</h2>
                  <p>{location?.state?.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-100 d-flex justify-content-between px-40 mt-30">
            <h3>Used </h3> <h3>Available </h3>
          </div>
          <div>
            {
              totalData == 0 ? <Progress bar color="danger" value={100} style={{ height: "50px" }} ><h2 style={{ marginTop: "6px" }}>0GB</h2></Progress>
                :
                <Progress multi style={{ height: "50px" }}>
                  <Progress bar color="danger" value={useData} ><h2 style={{ marginTop: "6px" }}>{useData}GB</h2></Progress>
                  <Progress bar color="success" value={totalData - useData}  ><h2 style={{ marginTop: "6px" }}>{totalData - useData}GB </h2></Progress>
                </Progress>
            }

          </div>
          {/* user Profile end */}

         <Table />
         



        </RctCollapsibleCard>


      </div>

    </div>
  )
}

export default CustomerDetails
