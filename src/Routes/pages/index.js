/**
 * Pages Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    AsyncGalleryComponent,
    AsyncFeedbackComponent,
    AsyncReportComponent,
    AsyncFaqComponent,
    AsyncPricingComponent,
    AsyncBlankComponent
} from 'Components/AsyncComponent/AsyncComponent';

import CreateNewModal from './modal/CreateNewModal';
import LoadExistingModal from './modal/LoadExistingModal';
import CompareModals from './modal/CompareModals';
import DownloadResults from "./modal/DownloadResults"

const Pages = ({ match }) => (
    <div className="content-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/gallery`} />
            <Route path={`${match.url}/gallery`} component={AsyncGalleryComponent} />
            <Route path={`${match.url}/pricing`} component={AsyncPricingComponent} />
            <Route path={`${match.url}/blank`} component={AsyncBlankComponent} />
            <Route path={`${match.url}/feedback`} component={AsyncFeedbackComponent} />
            <Route path={`${match.url}/report`} component={AsyncReportComponent} />
            <Route path={`${match.url}/faq`} component={AsyncFaqComponent} />

            {/* <Route path={`${match.url}/create-new-modal`} component={CreateNewModal} /> */}
            <Route path={`${match.url}/create-new-modal`} component={CreateNewModal}  />
            <Route path={`${match.url}/existing-model`} component={LoadExistingModal}  />
            <Route path={`${match.url}/compare-modals`} component={CompareModals}  />
            <Route path={`${match.url}/download-results`} component={DownloadResults}  />
        </Switch>
    </div>
);

export default Pages;
