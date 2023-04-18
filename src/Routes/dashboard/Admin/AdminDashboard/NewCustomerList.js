/**
 * Transaction table section
 */
 import React, { useState,useEffect,useRef } from 'react';
 import { withStyles } from '@material-ui/core/styles';
 import SwipeableViews from 'react-swipeable-views';
 import { AppBar, Tabs, Tab, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
 import { Scrollbars } from 'react-custom-scrollbars';
 import Pagination from "react-js-pagination";
 import { NotificationManager } from 'react-notifications'
 import DeleteIcon from '@mui/icons-material/Delete';
  import ContentCopyIcon from '@mui/icons-material/ContentCopy';
 import {
    Button,
   
  } from 'reactstrap';
 // intl messages
 import IntlMessages from 'Util/IntlMessages';
 import { 
   AllLowDtaUser,
   AllCoupons,
   AllUser ,AdminCoupanList, AdminCoupanSearch,SearchLowDataAvilableUser ,LowDataAvilableUser, getSearchedCustomer, getCustomerList, DeleteCoupon} from 'Api';
 import { getFormatDate2 } from 'Constants/DateFormator';
 import { copyToClipboard } from 'Constants/CopyToClipboard';
 import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';
 import { useHistory } from 'react-router';
 import { exportToExcel } from 'Routes/dashboard/ReuseComponent/exportToExcel';
 import FileDownloadIcon from '@mui/icons-material/FileDownload';
const NewUserheading = ['No','User', 'Email', 'Phone', 'GST No', 'Data Available'];
function TabContainer({ children, dir }) {
    return (
       <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
          {children}
       </Typography>
    );
 }
const NewCustomerList = (props) => {
 const history = useHistory();
 const { theme } = props;

 useEffect(() => {
    getNew_UserData()
        
     }, [])


//  New Coustomer List 

const [newDataUser, setNewDataUser] = useState([])
const [filteredNewDataUser, setFilterNewDataUser] = useState([])
const [new_searchText, setNew_searchText] = useState('');
const [new_activePage , setNew_activePage] = useState(1)
const [new_totalPageCount, setNew_totalPageCount] = useState('');
const [new_loading, setNew_Loading] = useState(false)



const getNew_UserData = () => {
 const accessToken = JSON.parse(localStorage.getItem('token'))
 if (accessToken !== null) {
  getCustomerList(accessToken, new_activePage)
     .then((res) => {
       if (res?.status === 200) {
        setNewDataUser(res?.data?.results);
        setFilterNewDataUser(res?.data?.results);
        setNew_totalPageCount(parseInt(res?.data?.count));
         // console.log('Response from customerlist :', res)
       } else {
         // console.log('Response from customerlist:', res)
       }
     })
     .catch((err) => {
       // console.log("status of invalid token", err?.response?.data, err?.response?.status)
       if(err?.response?.status == 401){
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



const getSearchNewUserData= () => {
 const accessToken = JSON.parse(localStorage.getItem('token'))
 if (accessToken !== null) {

  console.log( new_searchText ," new_searchText")
  getSearchedCustomer(accessToken, new_searchText)
     .then((res) => {
       if (res?.status === 200 && res?.data?.results.length>0) {
        setFilterNewDataUser(res?.data?.results);
        setNew_searchText('')
         console.log('Response search from customerlist :', res)
       } else {
         // console.log('Response from customerlist:', res)
         setFilterNewDataUser(newDataUser);
         setNew_searchText('');
         NotificationManager.error("No user found!")
       }
     })
     .catch((err) => {
       // console.log('Response from customerlist:', err)
     })
 }
}

const NewhandlePageChange = (pageNumber) => {

   if (new_activePage !== pageNumber) {
    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
      getCustomerList(accessToken, pageNumber)
        .then((res) => {
          if (res?.status === 200) {
            setNewDataUser(res?.data?.results);
            setFilterNewDataUser(res?.data?.results);
            setNew_totalPageCount(res?.data?.count);
            // console.log('Response from customerlist :', res)
          } else {
            // console.log('Response from customerlist:', res)
          }
        })
        .catch((err) => {
          // console.log('Response from customerlist:', err)
        })
    }
 
    setNew_activePage(pageNumber)
} 
}


 // AllUser data get 

 const FileDownload3=()=>{
    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
      AllUser(accessToken)
        .then((res) => {
          if (res?.status === 200) {
              console.log("hiiii")
            exportToExcel(res?.data, "All User")
          } else {
            // console.log('Response from customerlist:', res)
          }
        })
        .catch((err) => {
          // console.log('Response from customerlist:', err)
        })
    }
       

   }

  return (
    <div className="card mb-0 transaction-box">
   
                  <TabContainer dir={theme.direction}>
                  <div className="d-flex  px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
            <div className='search-row search-Box-Table'>
              <input type="text" placeholder='Search'  className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} onChange={(e)=>setNew_searchText(e.target.value)} />
              <Button variant="contained" color="primary" className="text-white mx-5 "  size="medium"  onClick={getSearchNewUserData}>Search</Button>
              <Button variant="contained" color="primary" className="text-white mx-5 d-flex align-items-center justify-content-center"  size="medium"  onClick={FileDownload3}><FileDownloadIcon/>Download</Button>

            </div>
            </div>
                     <Table className="table table-middle table-hover mb-0">
                  
                        <TableHead>
                           <TableRow>
                              {NewUserheading.map((th, index) => (
                                 <TableCell key={index} className="fw-bold">{th}</TableCell>
                              ))}
                           </TableRow>
                        </TableHead>
                        <TableBody>
                      
                 
                           {filteredNewDataUser.length >0 && filteredNewDataUser.map((user, index) => (
                              <TableRow key={index}>
                                 <TableCell>{index+1}</TableCell>
                                 <TableCell>{user?.username?user?.username:"-"}</TableCell>
                                 <TableCell>{user?.email ? user?.email : '-'}</TableCell>
                              
                                 <TableCell>{user?.mobile_number? user?.mobile_number : '-'}</TableCell>
                                 <TableCell>{user?.gst_number != null ? user?.gst_number : '-'}</TableCell>
                                 <TableCell>{user?.total_size_consumed != null ? user?.total_size_consumed :0}</TableCell>
                                 
                              </TableRow>
                           ))}
                
                        </TableBody>
                     </Table>
                        {
                          filteredNewDataUser.length >0 && 
                           
              <div className='paginationDiv d-flex align-items-end justify-content-end ml-2 mt-10 '>
                <Pagination
                  activePage={new_activePage}
                  itemsCountPerPage={6}
                  pageRangeDisplayed={5}
                  onChange={(e) => NewhandlePageChange(e)}
                  itemClass="page-item"
                  linkClass="page-link"
                  hideFirstLastPages={true}
                  totalItemsCount={new_totalPageCount}
                />


              </div>
            }
                  </TabContainer>
               </div>
  )
}

export default NewCustomerList
