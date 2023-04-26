/**
 * Space Widget
 */
import React, { useEffect,useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import Button from '@material-ui/core/Button';

// chart component
import SpacePieChart from 'Components/Charts/SpacePieChart';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import { UserAccountStatus } from 'Api';

function Space(props) {
   const { data } = props;
   const[ Accout,setAccout]=useState()
const[ useData,setUseData]=useState(0)
const[ totalData,setTotalData]=useState(0)
   useEffect(()=>{
      GetAccountStatus()
   },[])
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
   
   return (
      <Card className="rct-block d-flex ">
         <CardBody className="d-flex py-15 align-items-  justify-content-">
            <div className="mr-15 w-40 d-flex ">
               <SpacePieChart
                  labels={data.chartData.labels}
                  datasets={data.chartData.datasets}
                  height={97}
                  width={100}
               />
            </div>
            <div>
               <p className="mb-0"></p>
               {Accout && <p className="font-3x mb-0">{(totalData-useData).toFixed(2)}<sub className="text-dark font-lg">/{(totalData).toFixed(2)}GB </sub></p>}
               <p>Project size display in GB</p>
               {/* <Button color="primary" className="btn-xs"><IntlMessages id="widgets.buyMore" /></Button> */}
            </div>
         </CardBody>
      </Card>
   );
}

export default Space;