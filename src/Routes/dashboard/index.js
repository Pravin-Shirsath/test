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
   AsyncUserManagmentDashboardComponent

} from 'Components/AsyncComponent/AsyncComponent';


const Dashboard = ({ match }) => (
   <div className="dashboard-wrapper">
   
      <Switch>
         {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/ecommerce`} /> */}
         <Redirect exact from={`${match.url}/`} to={`${match.url}/saas`} />
         <Route path={`${match.url}/saas`} component={AsyncSaasDashboardComponent} />
         <Route path={`${match.url}/scenarioplanning`} component={AsyncScenarioPlanningDashboardComponent} />
         <Route path={`${match.url}/ecommerce`} component={AsyncEcommerceDashboardComponent} />
         <Route path={`${match.url}/agency`} component={AsyncAgencyDashboardComponent} />
         <Route path={`${match.url}/news`} component={AsyncNewsDashboardComponent} />
        
         <Route path={`${match.url}/account`} component={AsyncAccountDashboardComponent} />
         <Route path={`${match.url}/report`} component={AsyncReportDashboardComponent} />
         <Route path={`${match.url}/project`} component={AsyncProjectDashboardComponent} />
         <Route path={`${match.url}/userManagment`} component={AsyncUserManagmentDashboardComponent} />

      </Switch>
   </div>
);

export default Dashboard;
