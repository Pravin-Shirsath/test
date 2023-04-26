/**
 * Editor Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async components
import {
	AsyncQuillEditorComponent,
	AsyncWysiwygEditorComponent
} from 'Components/AsyncComponent/AsyncComponent';
import AppConfig from 'Constants/AppConfig';

const Editor = ({ match }) => (
	<div className="content-wrapper">
		<Helmet>
			<title>{AppConfig.brandName} | Editors</title>
			<meta name="description" content={`${AppConfig.brandName} Editors`}/>
		</Helmet>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/wysiwyg-editor`} />
			<Route path={`${match.url}/wysiwyg-editor`} component={AsyncWysiwygEditorComponent} />
			<Route path={`${match.url}/quill-editor`} component={AsyncQuillEditorComponent} />
		</Switch>
	</div>
);

export default Editor;
