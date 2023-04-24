/**
 * Notification Component
 */
import React, { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { Badge } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// api
import api, { notificationAll, seenNotification } from 'Api';
// intl messages
import IntlMessages from 'Util/IntlMessages';
import { getFormatDate2 } from 'Constants/DateFormator';

function Notifications(props){
   const [notifications, setNotifications] = useState(null);
   useEffect(() => {
      getNotifications();
   },[])

   // get notifications 
  
  //Get User Profile Info
  const getNotifications = () => {
   const accessToken = JSON.parse(localStorage.getItem('token'));
   console.log("Token", accessToken)
   if (accessToken !== null) {
      notificationAll(accessToken)
       .then(res => {

         if (res?.status === 200) {
            console.log("res=notification",res)
          if(res?.data?.results){
             setNotifications(res.data.results)
          }
         }
       }).catch(err => {
         
       });
   }
 }

 
//Get User Profile Info
const viewNotificaation = (id) => {
   const accessToken = JSON.parse(localStorage.getItem('token'));
   console.log("Token", accessToken)
   if (accessToken !== null) {
      seenNotification(accessToken,id)
       .then(res => {

         if (res?.status === 200) {
          
         }
       }).catch(err => {
         
       });
   }
 }
    

   



   return (
      <UncontrolledDropdown nav className="list-inline-item notification-dropdown ">
         <DropdownToggle nav className="p-0">
            <Tooltip title="Notifications" placement="bottom">
               <IconButton className={`${notifications && notifications.length > 0 ? "shake":""} text-white`}  aria-label="bell">
                  <i className="zmdi zmdi-notifications-active"></i>
                 {notifications && notifications.length > 0 && <Badge color="danger" className="badge-xs badge-top-right rct-notify">{notifications&&notifications.length}</Badge>}
               </IconButton>
            </Tooltip>
         </DropdownToggle>
         <DropdownMenu right>
            <div className="dropdown-content">
               <div className="dropdown-top d-flex justify-content-between rounded-top dark-primary">
                  <span className="text-white font-weight-bold">
                     <IntlMessages id="widgets.recentNotifications" />
                  </span>
                  {/* <Badge color="warning">1 NEW</Badge> */}
               </div>
               <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={280}>
                  <ul className="list-unstyled dropdown-list">
                     {notifications && notifications.map((notification, key) => (
                        <li key={key} className={``} onClick={()=>{viewNotificaation(notification.id)}}>
                           <div className={"media "}>
                              {/* <div className="mr-10">
                                 <img src={notification.userAvatar} alt="user profile" className="media-object rounded-circle" width="50" height="50" />
                              </div> */}
                              <div className="media-body pt-5">
                                 <div className="d-flex justify-content-between">
                                    <h5 className="mb-5 text-primary">{notification.context_type}</h5>
                                    <span className="text-muted fs-12">{getFormatDate2(notification.date_updated)}</span>
                                 </div>
                                 <span className="text-muted fs-12 d-block">{notification.message}</span>
                                 <div className='d-flex justify-content-end ' >

                                  {/* <span  className="text-danger">new</span> */}
                                 </div>
                                
                                 {/* <Button className="btn-xs">
                                    <i className="zmdi zmdi-thumb-up mr-2"></i> <IntlMessages id="button.like" />
                                 </Button> */}
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
               </Scrollbars>
            </div>
            {/* <div className="dropdown-foot p-2 bg-white rounded-bottom">
               <Button
                  variant="contained"
                  color="primary"
                  className="mr-10 btn-xs bg-primary"
               >
                  <IntlMessages id="button.viewAll" />
               </Button>
            </div> */}
         </DropdownMenu>
      </UncontrolledDropdown>
   );
}

export default Notifications;
