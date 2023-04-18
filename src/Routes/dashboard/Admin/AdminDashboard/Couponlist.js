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
const CoupansHeding = ['Sr No', 'Coupon Id','Created Date', 'Discount', 'Is Utilized', 'Utilized By', 'Discount Amt','Action'];
function TabContainer({ children, dir }) {
    return (
       <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
          {children}
       </Typography>
    );
 }
const Couponlist = (props) => {
    const { theme } = props;

    useEffect(() => {
       
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
    
    
    
    // AllCoupons data get 
   const FileDownload2=()=>{
    const accessToken = JSON.parse(localStorage.getItem('token'))
    if (accessToken !== null) {
      AllCoupons(accessToken)
        .then((res) => {
          if (res?.status === 200) {
            exportToExcel(res?.data, "AllCoupons")
          } else {
            // console.log('Response from customerlist:', res)
          }
        })
        .catch((err) => {
          // console.log('Response from customerlist:', err)
        })
    }
       

   }
    
    
    
    // Coupan section end
  return (
    <div>
       <DeleteConfirmationDialog title="Are You Sure Want To Delete?"
             message="This will delete your Coupan permanently."
             onConfirm={() => Delete_Coupan()}
             ref={deleteConfirmationDialog} />
                  
                  <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                  <div className="d-flex  px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
            <div className='search-row search-Box-Table'>
              <input type="text" placeholder='Search' onChange={(e)=>setSearchText(e.target.value)} className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} />
              <Button variant="contained" color="primary" className="text-white mx-5 "  size="medium" onClick={getSearchedCustomerData}>Search</Button>
              <Button variant="contained" color="primary" className="text-white mx-5 d-flex align-items-center justify-content-center"  size="medium"  onClick={FileDownload2}><FileDownloadIcon/>Download</Button>
           
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
    </div>
  )
}

export default Couponlist
