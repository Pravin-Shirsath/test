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
   AsyncScenarioPlanningDashboardComponent
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

      </Switch>
   </div>
);

export default Dashboard;
