/**
 * Charts Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async components
import {
	AsyncRechartsComponent,
	AsyncReactChartsjs2Component
} from 'Components/AsyncComponent/AsyncComponent';
import AppConfig from 'Constants/AppConfig';

const ChartsComponent = ({ match }) => (
	<div className="content-wrapper">
		<Helmet>
			<title>{AppConfig.brandName} | Charts</title>
			<meta name="description" content={`${AppConfig.brandName} Charts`} />
		</Helmet>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/re-charts`} />
			<Route path={`${match.url}/re-charts`} component={AsyncRechartsComponent} />
			<Route path={`${match.url}/react-chartjs2`} component={AsyncReactChartsjs2Component} />
		</Switch>
	</div>
);

export default ChartsComponent;
