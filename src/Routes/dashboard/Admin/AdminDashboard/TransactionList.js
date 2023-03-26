/**
 * Transaction table section
 */
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { AppBar, Tabs, Tab, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import Pagination from "react-js-pagination";
import {
   Button,
  
 } from 'reactstrap';
// intl messages
import IntlMessages from 'Util/IntlMessages';

function TabContainer({ children, dir }) {
   return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
         {children}
      </Typography>
   );
}

const TransactionColumns = ['No', 'user', 'email', 'phone', 'GST No', 'Data Available'];
const TransferColumns =['No', 'user', 'email', 'phone', 'GST No', 'Data Available'];
const ExpenseColumns = ['Sr No', 'Coupon Id', 'Discount', 'is Utilized', 'Utilized by', 'Discount Amt','Action'];

function TransactionList(props){

   const [value,setValue] = useState(0);
   
   const handleChange = (event, value) => {
      setValue(value);
   };

   const handleChangeIndex = index => {
      setValue(index);
   };
   const { theme, listData, transferreport, expenseCategory } = props;


const handlePageChange=(e)=>{

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
               <Tab label="New customer list"  />
               <Tab label="Low data availability customer list" />
               <Tab label="Coupons"/>
            </Tabs>
         </AppBar>
         <Scrollbars className="rct-scroll" autoHeight autoHeightMin={200} autoHeightMax={820} autoHide>
            <SwipeableViews
               axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
               index={value}
               onChangeIndex={handleChangeIndex}>
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                  <div className="d-flex  px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
            <div className='search-row'>
              <input type="text" placeholder='Search' className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} />
              <Button variant="contained" color="primary" className="text-white mx-5 "  size="small">Search</Button>
            </div>
            </div>
                     <Table className="table-wrap">
                  
                        <TableHead>
                           <TableRow>
                              {TransactionColumns.map((th, index) => (
                                 <TableCell key={index} className="fw-bold">{th}</TableCell>
                              ))}
                           </TableRow>
                        </TableHead>
                        <TableBody>
                      
                        {/* 
                         No: "01",
       User: "Pravin s",
       Email: "pravin@yopmail.com",
       Phone: "+911234567890",
       GST_No: "ASFH#DJK8DDJDDDD",
       Data_Available: "2000", */}
                           {listData.map((list, index) => (
                              <TableRow key={index}>
                                 <TableCell>{list.No}</TableCell>
                                 <TableCell>{list.User}</TableCell>
                                 <TableCell>{list.Email}</TableCell>
                                 {/* <TableCell><Badge color={list.typeColor}>{list.type}</Badge></TableCell> */}
                                 <TableCell>{list.Phone}</TableCell>
                                 <TableCell>{list.GST_No}</TableCell>
                                 <TableCell>{list.Data_Available}</TableCell>
                                 {/* <TableCell>{list.balance}</TableCell> */}
                              </TableRow>
                           ))}
                
                        </TableBody>
                        {
                           listData?.length > 0 &&
                           
              <div className='paginationDiv '>
                <Pagination
                  activePage={1}
                  itemsCountPerPage={6}
                  pageRangeDisplayed={5}
                  onChange={(e) => handlePageChange(e)}
                  itemClass="page-item"
                  linkClass="page-link"
                  hideFirstLastPages={true}
                  totalItemsCount={10}
                />


              </div>
            }
                     </Table>
                  </TabContainer>
               </div>
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                  <div className="d-flex  px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
            <div className='search-row'>
              <input type="text" placeholder='Search' className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} />
              <Button variant="contained" color="primary" className="text-white mx-5 "  size="small">Search</Button>
            </div>
            </div>
                     <Table className="table-wrap" >
                        <TableHead>
                           <TableRow>
                              {TransferColumns.map((th, index) => (
                                 <TableCell key={index} className="fw-bold">{th}</TableCell>
                              ))}
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {transferreport.map((list, index) => (
                              <TableRow key={index}>
                              <TableCell>{list.No}</TableCell>
                                 <TableCell>{list.User}</TableCell>
                                 <TableCell>{list.Email}</TableCell>
                                 {/* <TableCell><Badge color={list.typeColor}>{list.type}</Badge></TableCell> */}
                                 <TableCell>{list.Phone}</TableCell>
                                 <TableCell>{list.GST_No}</TableCell>
                                 <TableCell>{list.Data_Available}</TableCell>
                                 {/* <TableCell>{list.balance}</TableCell> */}
                              </TableRow>
                           ))}
                        </TableBody>
                        {
                           listData?.length > 0 &&
              <div className='paginationDiv '>
                <Pagination
                  activePage={1}
                  itemsCountPerPage={6}
                  pageRangeDisplayed={5}
                  onChange={(e) => handlePageChange(e)}
                  itemClass="page-item"
                  linkClass="page-link"
                  hideFirstLastPages={true}
                  totalItemsCount={10}
                />


              </div>
            }
                     </Table>
                  </TabContainer>
               </div>
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                  <div className="d-flex  px-10 border-bottom" style={{ justifyContent: 'space-between' }}>
            <div className='search-row'>
              <input type="text" placeholder='Search' className='search-input py-2' style={{ border: "none", borderBottom: "1px solid black" }} />
              <Button variant="contained" color="primary" className="text-white mx-5 "  size="small">Search</Button>
            </div>
            </div>
                     <Table className="table-wrap" >
                        <TableHead>
                           <TableRow>
                              {ExpenseColumns.map((th, index) => (
                                 <TableCell key={index} className="fw-bold">{th}</TableCell>
                              ))}
                           </TableRow>
                        </TableHead>
                        <TableBody>
                        {/* 
                         Sr_no: "01",
        Coupon_Id: "12018",
        Discount: 100,
         is_Utilized: false,
        discount_Amt: 50,
        Action: "",
       */}
                           {expenseCategory.map((list, index) => (
                              <TableRow key={index}>
                                 <TableCell>{list.Sr_no}</TableCell>
                                 <TableCell>{list.Coupon_Id}</TableCell>
                                 {/* <TableCell><Badge color={list.typeColor}>{list.type}</Badge></TableCell> */}
                                 <TableCell>{list.Discount}</TableCell>
                                 <TableCell>{list.is_Utilized}</TableCell>
                                 <TableCell>{list?.Utilise_by}</TableCell>
                                 <TableCell>{list.discount_Amt}</TableCell>
                                 <TableCell>{list.Action+""}</TableCell>

                                 {/* <TableCell><Badge color={list.statusColor}>{list.status}</Badge></TableCell> */}
                              </TableRow>
                           ))}
                          
                        </TableBody>
                        {
                           listData?.length > 0 &&
              <div className='paginationDiv'>
                <Pagination
                  activePage={1}
                  itemsCountPerPage={6}
                  pageRangeDisplayed={5}
                  onChange={(e) => handlePageChange(e)}
                  itemClass="page-item"
                  linkClass="page-link"
                  hideFirstLastPages={true}
                  totalItemsCount={10}
                />


              </div>
            }
                     </Table>
                  </TabContainer>
               </div>
            </SwipeableViews>
         </Scrollbars>
      </div>
   );
}

export default withStyles(null, { withTheme: true })(TransactionList);
