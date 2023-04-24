/**
 * Transaction table section
 */
 import React, { useState,useEffect,useRef } from 'react';
 import { withStyles } from '@material-ui/core/styles';
 import SwipeableViews from 'react-swipeable-views';
 import { AppBar, Tabs, Tab, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
 import { Scrollbars } from 'react-custom-scrollbars';

 import { useHistory } from 'react-router';

import NewCustomerList from './NewCustomerList';
import LowDataAwailable from './LowDataAwailable';
import Couponlist from './Couponlist';
 function TabContainer({ children, dir }) {
    return (
       <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
          {children}
       </Typography>
    );
 }
 

 function TransactionList2(props){
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
         
 
          <Scrollbars autoHeight autoHeightMin={200} autoHeightMax={820} autoHide>
             <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}>
               
           {/* New user List */}
           
           <NewCustomerList {...props}/>
 
 
           <LowDataAwailable {...props}/>
 
          <Couponlist {...props}/>
                
                
             </SwipeableViews>
          </Scrollbars>
       </div>
    );
 }
 
 export default withStyles(null, { withTheme: true })(TransactionList2);
 