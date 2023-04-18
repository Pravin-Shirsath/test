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

 const LowDataUser =['No', 'User', 'Email', 'Phone', 'GST No', 'Data Available'];
 function TabContainer({ children, dir }) {
    return (
       <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
          {children}
       </Typography>
    );
 }
const LowDataAwailable = (props) => {
    const history = useHistory();
    const { theme } = props;


    // / THIS FUNCTION NAVIGGATE TO PERTICULAR USE INFO
     const  Navigate =(list)=>{
      console.log(list ,"list ")
      localStorage.setItem('CustomerId',JSON.stringify(list?.id))
      
            history.push("/app/dashboard/Admin/CustomerDetails",list)
     }
 
 
   useEffect(() => {
   
    getLDU_AllData()
  
     
   
  }, [])

  // Low Data Avilable User   ldu / LDU

const [lowDataUser, setLowDataUser] = useState([])
const [filteredlowDataUser, setFilterLowDataUser] = useState([])
const [ldu_searchText, setLdu_searchText] = useState('');
const [ldu_activePage , setLdu_activePage] = useState(1)
const [ldu_totalPageCount, setLdu_totalPageCount] = useState('');
const [ldu_loading, setLdu_Loading] = useState(false)

// Coupan section Start

const getLDU_AllData = () => {
 const accessToken = JSON.parse(localStorage.getItem('token'))
 if (accessToken !== null) {
  LowDataAvilableUser(accessToken, ldu_activePage)
     .then((res) => {
       if (res?.status === 200) {
        setLowDataUser(res?.data?.results);
        setFilterLowDataUser(res?.data?.results);
        setLdu_totalPageCount(parseInt(res?.data?.count));
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



const getSearchedLDUData = () => {
 const accessToken = JSON.parse(localStorage.getItem('token'))
 if (accessToken !== null) {
  SearchLowDataAvilableUser(accessToken, ldu_searchText)
     .then((res) => {
       if (res?.status === 200 && res?.data?.results.length>0) {
        setFilterLowDataUser(res?.data?.results);
        setLdu_searchText('')
         // console.log('Response from customerlist :', res)
       } else {
         // console.log('Response from customerlist:', res)
         setFilterLowDataUser(lowDataUser);
         setLdu_searchText('');
         NotificationManager.error("No user found!")
       }
     })
     .catch((err) => {
       // console.log('Response from customerlist:', err)
     })
 }
}

const LDUhandlePageChange = (pageNumber) => {
// console.log("pagination", pageNumber)
   if (ldu_activePage !== pageNumber) {
    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
      LowDataAvilableUser(accessToken, pageNumber)
        .then((res) => {
          if (res?.status === 200) {
            setLowDataUser(res?.data?.results);
            setFilterLowDataUser(res?.data?.results);
            setLdu_totalPageCount(res?.data?.count);
            // console.log('Response from customerlist :', res)
          } else {
            // console.log('Response from customerlist:', res)
          }
        })
        .catch((err) => {
          // console.log('Response from customerlist:', err)
        })
    }
 
    setLdu_activePage(pageNumber)
} 
}

// AllLowDtaUser data get 

const FileDownload1=()=>{
    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
      AllLowDtaUser(accessToken)
        .then((res) => {
          if (res?.status === 200) {
            console.log(res)
            if(res?.data){
              exportToExcel(res?.data, "Low Data User")
            }
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
<input type="text" placeholder='Search' onChange={(e)=>{setLdu_searchText(e.target.value)}} className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} />
<Button variant="contained" color="primary" className="text-white mx-5 "  size="medium" onClick={getSearchedLDUData}>Search</Button>
<Button variant="contained" color="primary" className="text-white mx-5 d-flex align-items-center justify-content-center"  size="medium"  onClick={FileDownload1}><FileDownloadIcon/>Download</Button>

</div>
</div>
       <Table className="table table-middle table-hover mb-0" >
          <TableHead>
             <TableRow>
                {LowDataUser.map((th, index) => (
                   <TableCell key={index} className="fw-bold">{th}</TableCell>
                ))}
             </TableRow>
          </TableHead>
          <TableBody>


       
             {filteredlowDataUser.length>0 && filteredlowDataUser.map((list, index) => (
                <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                   <TableCell style={{cursor:"pointer"}} onClick={()=>Navigate(list)}><b>{list?.username}</b></TableCell>
                   <TableCell  onClick={()=>Navigate(list)}>{list?.email}</TableCell>
                   {/* <TableCell><Badge color={list.typeColor}>{list.type}</Badge></TableCell> */}
                   <TableCell>{list?.mobile_number != null ? list.mobile_number :"-"}</TableCell>
                   <TableCell>{list?.gst_number != null ? list?.gst_number :"-" }</TableCell>
                   <TableCell>{list?.total_size_consumed}</TableCell>
                   {/* <TableCell>{list.balance}</TableCell> */}
                </TableRow>
             ))}
          </TableBody>
       </Table>
          {
            filteredlowDataUser.length>0 && 
<div className='paginationDiv d-flex align-items-end justify-content-end ml-2 mt-10'>
  <Pagination
    activePage={ldu_activePage}
    itemsCountPerPage={6}
    pageRangeDisplayed={5}
    onChange={(e) => LDUhandlePageChange(e)}
    itemClass="page-item"
    linkClass="page-link"
    hideFirstLastPages={true}
    totalItemsCount={ldu_totalPageCount}
  />


</div>
}
    </TabContainer>
 </div>
  )
}

export default LowDataAwailable
