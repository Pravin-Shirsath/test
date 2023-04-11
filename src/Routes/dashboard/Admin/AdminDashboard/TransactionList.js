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
import { AdminCoupanList, AdminCoupanSearch,SearchLowDataAvilableUser ,LowDataAvilableUser, getSearchedCustomer, getCustomerList, DeleteCoupon} from 'Api';
import { getFormatDate2 } from 'Constants/DateFormator';
import { copyToClipboard } from 'Constants/CopyToClipboard';
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';
import { useHistory } from 'react-router';

function TabContainer({ children, dir }) {
   return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
         {children}
      </Typography>
   );
}

const NewUserheading = ['No','User', 'Email', 'Phone', 'GST No', 'Data Available'];
const LowDataUser =['No', 'User', 'Email', 'Phone', 'GST No', 'Data Available'];
const CoupansHeding = ['Sr No', 'Coupon Id','Created Date', 'Discount', 'Is Utilized', 'Utilized By', 'Discount Amt','Action'];

function TransactionList(props){
  const history = useHistory();
   const [value,setValue] = useState(0);
   // Coupan State
 
   const handleChange = (event, value) => {
      setValue(value);
   };

   const handleChangeIndex = index => {
      setValue(index);
   };
   const { theme, listData, transferreport, expenseCategory } = props;




// THIS FUNCTION NAVIGGATE TO PERTICULAR USE INFO
     const  Navigate =(list)=>{
     

      
            history.push("/app/dashboard/Admin/CustomerDetails",list)
     }
 
 
   useEffect(() => {
    getNew_UserData()
    getLDU_AllData()
    getCoupanAllData();
     
   
  }, [])



   const [coupans, setCoupans] = useState([])
   const [filteredCoupans, setFilterCoupans] = useState([])
   const [searchText, setSearchText] = useState('');
   const [activePage , setActivePage] = useState(1)
   const [totalPageCount, setTotalPageCount] = useState('');
   const [loading, setLoading] = useState(false)
   const deleteConfirmationDialog = useRef()
   const [selected, setSelectedItem] = useState({})
// Coupan section Start

  const getCoupanAllData = () => {
    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
     AdminCoupanList(accessToken, activePage)
        .then((res) => {
          if (res?.status === 200) {
            setCoupans(res?.data?.results);
            setFilterCoupans(res?.data?.results);
            setTotalPageCount(parseInt(res?.data?.count));
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



  const getSearchedCustomerData = () => {
    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
     AdminCoupanSearch(accessToken, searchText)
        .then((res) => {
          if (res?.status === 200 && res?.data?.results.length>0) {
            setFilterCoupans(res?.data?.results);
            setSearchText('')
            // console.log('Response from customerlist :', res)
          } else {
            // console.log('Response from customerlist:', res)
            setFilterCoupans(coupans);
            setSearchText('');
            NotificationManager.error("No user found!")
          }
        })
        .catch((err) => {
          // console.log('Response from customerlist:', err)
        })
    }
  }

  const handlePageChange = (pageNumber) => {
   // console.log("pagination", pageNumber)
      if (activePage !== pageNumber) {
       const accessToken = JSON.parse(localStorage.getItem('token'))
       if (accessToken !== null) {
        AdminCoupanList(accessToken, pageNumber)
           .then((res) => {
             if (res?.status === 200) {
               setCoupans(res?.data?.results);
               setFilterCoupans(res?.data?.results);
               setTotalPageCount(res?.data?.count);
               // console.log('Response from customerlist :', res)
             } else {
               // console.log('Response from customerlist:', res)
             }
           })
           .catch((err) => {
             // console.log('Response from customerlist:', err)
           })
       }
    
     setActivePage(pageNumber)
   } 
 }






 const DeletModalOpen = (item) => {
  setSelectedItem(item)
  deleteConfirmationDialog.current.open()
}
const Delete_Coupan = () => {


  const accessToken = JSON.parse(localStorage.getItem('token'))
  if (accessToken !== null) {
    DeleteCoupon(accessToken, selected?.id)
      .then((res) => {
        if (res?.status === 200) {
          deleteConfirmationDialog.current.close()
          getCoupanAllData();
          NotificationManager.success("coupan deleted !")
          console.log('Response from search  :', res)

        } else {


          NotificationManager.error("Coupan deleting process unsucess!")
        }
      })
      .catch((err) => {
        NotificationManager.error("Coupan deleting process unsucess!")
      })
  }
}







// Coupan section end



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
  LowDataAvilableUser(accessToken, activePage)
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














   return (
      <div className="Transaction-table-wrap Tab-wrap">
         <AppBar position="static" color="default">
            <Tabs
               value={value}
               onChange={handleChange}
               indicatorColor="primary"
               textColor="primary"
               variant="scrollable"
               
            >
               <Tab label={<p className="dark-primary-text p-0 tab-Heading" >New customer list </p>} />
               <Tab label={<p className="dark-primary-text p-0 tab-Heading" >Low data availability customer list </p>} />
               <Tab label={<p className="dark-primary-text p-0 tab-Heading" >Coupons</p>} />
               
            </Tabs>
         </AppBar>
         <DeleteConfirmationDialog title="Are You Sure Want To Delete?"
             message="This will delete your Coupan permanently."
             onConfirm={() => Delete_Coupan()}
             ref={deleteConfirmationDialog} />
         <Scrollbars autoHeight autoHeightMin={200} autoHeightMax={820} autoHide>
            <SwipeableViews
               axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
               index={value}
               onChangeIndex={handleChangeIndex}>
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                  <div className="d-flex  px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
            <div className='search-row search-Box-Table'>
              <input type="text" placeholder='Search'  className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} onChange={(e)=>setNew_searchText(e.target.value)} />
              <Button variant="contained" color="primary" className="text-white mx-5 "  size="medium"  onClick={getSearchNewUserData}>Search</Button>
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
                              
                                 <TableCell>{user?.phone ? user?.phone : '-'}</TableCell>
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
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                  <div className="d-flex  px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
            <div className='search-row search-Box-Table'>
              <input type="text" placeholder='Search' onChange={(e)=>{setLdu_searchText(e.target.value)}} className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} />
              <Button variant="contained" color="primary" className="text-white mx-5 "  size="medium" onClick={getSearchedLDUData}>Search</Button>
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
                                 <TableCell onClick={()=>Navigate(list)}>{list?.username}</TableCell>
                                 <TableCell onClick={()=>Navigate(list)}>{list?.email}</TableCell>
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
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                  <div className="d-flex  px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
            <div className='search-row search-Box-Table'>
              <input type="text" placeholder='Search' onChange={(e)=>setSearchText(e.target.value)} className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} />
              <Button variant="contained" color="primary" className="text-white mx-5 "  size="medium" onClick={getSearchedCustomerData}>Search</Button>
            </div>
            </div>
                     <Table className="table table-middle table-hover mb-0" >
                        <TableHead>
                           <TableRow>
                              {CoupansHeding.map((th, index) => (
                                 <TableCell key={index} className="fw-bold">{th}</TableCell>
                              ))}
                           </TableRow>
                        </TableHead>
                        <TableBody>
              
                           {filteredCoupans.length > 0 && filteredCoupans.map((item, index) =>{
                              let created_Date = getFormatDate2((item?.date_created))
                               return(
                              <TableRow key={index}>
                                 <TableCell>{index+1}</TableCell>
                                 <TableCell>{item?.coupon_text}</TableCell>
                                 <TableCell>{created_Date?created_Date:"-"}</TableCell>
                                 <TableCell>{`${item?.discount_value} ${item?.discount_type == "amount"? "₹" : "%"} `}</TableCell>
                                 <TableCell>{item?.is_utilized+""}</TableCell>
                                 <TableCell>{item?.utilized_by == null ? "-":item?.utilized_by}</TableCell>
                                 <TableCell>{item?.discount_value }</TableCell>
                                 <TableCell> 
                                       <ContentCopyIcon onClick={()=>copyToClipboard(item?.coupon_text)}/>
                                       <DeleteIcon onClick={()=>DeletModalOpen(item)} />
                                  </TableCell>

                                 {/* <TableCell><Badge color={list.statusColor}>{list.status}</Badge></TableCell> */}
                              </TableRow>
                           )}
                           )}
                          
                        </TableBody>
                        
                     </Table>
                     {
                      filteredCoupans.length > 0 &&
              <div className='paginationDiv d-flex align-items-end justify-content-end ml-2 mt-10'>
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={6}
                  pageRangeDisplayed={5}
                  onChange={(e) => handlePageChange(e)}
                  itemClass="page-item"
                  linkClass="page-link"
                  hideFirstLastPages={true}
                  totalItemsCount={totalPageCount}
                />


              </div>
            }
                  </TabContainer>
               </div>
            </SwipeableViews>
         </Scrollbars>
      </div>
   );
}

export default withStyles(null, { withTheme: true })(TransactionList);
