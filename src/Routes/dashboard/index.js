/**
 * Dasboard Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
   AsyncScenarioPlanningDashboardComponent,

   AsyncAccountDashboardComponent,
   AsyncReportDashboardComponent,
   AsyncProjectDashboardComponent,
   AsyncUserManagmentDashboardComponent,
   AsyncAdminDashboardComponent,
   AsyncAddCoupansComponent,
   AsyncCustomerManagementComponent,
   AsyncAdminAccountComponent,
   AsyncAdminreportComponent,
   AsyncAdminProjectComponent,
   AsyncViewProjectComponent,
   AsyncCreateProjectComponent,
   AsyncRechargeModalComponent,
   AsyncCreateDatasetComponent,
   AsyncCreateTaskComponent,
   AsyncViewDataset,
   AsyncCoustomerDetailsComponent

} from 'Components/AsyncComponent/AsyncComponent';


const Dashboard = ({ match }) =>{

   const type = JSON.parse(localStorage.getItem('user_type'));


return(
      
     

   <div className="dashboard-wrapper">
   
      <Switch>
         {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/ecommerce`} /> */}
         
        
         {
           ( type === "customer" || type === "company_admin")&& <Redirect exact from={`${match.url}/`} to={`${match.url}/saas`} />
          
         }

         {
            type === "admin"   && <Redirect exact from={`${match.url}/`} to={`${match.url}/Admin/Dashboard`} />
         }
         <Route path={`${match.url}/saas`} component={AsyncSaasDashboardComponent} />
         <Route path={`${match.url}/scenarioplanning`} component={AsyncScenarioPlanningDashboardComponent} />
         <Route path={`${match.url}/ecommerce`} component={AsyncEcommerceDashboardComponent} />
         <Route path={`${match.url}/agency`} component={AsyncAgencyDashboardComponent} />
         <Route path={`${match.url}/news`} component={AsyncNewsDashboardComponent} />
        
         <Route path={`${match.url}/account`} component={AsyncAccountDashboardComponent} />
         <Route path={`${match.url}/report`} component={AsyncReportDashboardComponent} />
         <Route path={`${match.url}/project`} component={AsyncProjectDashboardComponent} />
         <Route path={`${match.url}/userManagment`} component={AsyncUserManagmentDashboardComponent} />
         <Route path={`${match.url}/viewProject`} component={AsyncViewProjectComponent} />
         <Route path={`${match.url}/createProject`} component={AsyncCreateProjectComponent} />
         <Route path={`${match.url}/rechargeModal`} component={AsyncRechargeModalComponent} />
         <Route path={`${match.url}/createDataset`} component={AsyncCreateDatasetComponent} />
         <Route path={`${match.url}/createTask`}  component={AsyncCreateTaskComponent} />
         <Route path={`${match.url}/viewDataset`} component={AsyncViewDataset} />
         
         <Route path={`${match.url}/Admin/Dashboard`} component={AsyncAdminDashboardComponent} />
         <Route path={`${match.url}/Admin/Coupons`} component={AsyncAddCoupansComponent} />
         <Route path={`${match.url}/Admin/CustomerManagement`} component={AsyncCustomerManagementComponent} />
         <Route path={`${match.url}/Admin/Account`} component={AsyncAdminAccountComponent} />
         <Route path={`${match.url}/Admin/Report`} component={AsyncAdminreportComponent} />
         <Route path={`${match.url}/Admin/Project`} component={AsyncAdminProjectComponent} />
         <Route path={`${match.url}/Admin/CustomerDetails`} component={AsyncCoustomerDetailsComponent} />
         
         

      </Switch>
   </div>
)};

export default Dashboard;
