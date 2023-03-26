import React from 'react'
// rct card box

// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { RctCard, RctCardContent } from 'Components/RctCard';
import  TransactionList  from './TransactionList';
import {
  visitorData,
  revenueData,
  salesData,
  dealData,
  transactionList,
  transferreport,
  expenseCategory
} from './data';
const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin  dashboard</h1>
      <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
               <RctCard>
                  <RctCardContent>
                     <TransactionList
                        listData={transactionList}
                        transferreport={transferreport}
                        expenseCategory={expenseCategory}
                     />
                  </RctCardContent>
               </RctCard>
            </div>
         </div>
    </div>
  )
}

export default AdminDashboard
