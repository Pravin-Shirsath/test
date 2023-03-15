/**
* Main App
*/
import React, {useState, useEffect} from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// Added by vish (using adminList api for token validation)
import { getAdminList } from 'Api';

// css
import 'Assets/scss/reactifyCss';

// firebase
import './Firebase';

// app component
import App from 'Container/App';

import { configureStore } from 'Store';

function MainApp(){
	// const [boolLoginCheck, setBoolLoginCheck] = useState(false)

	// useEffect(()=> {
	// 	const accessToken = JSON.parse(localStorage.getItem('token'))
	// 	if (accessToken !== null) {
	// 	getAdminList(accessToken, "1")
	// 		.then((res) => {
	// 			if (res?.status === 200) {
	// 				setBoolLoginCheck(true)
	// 			}
	// 		})
	// 		.catch((err) => {
	// 		console.log("status of invalid token from app.js file", err?.response?.data, err?.response?.status)
	// 		if(err?.response?.status == 401){
	// 			setBoolLoginCheck(false)
	// 			console.log('Response from app.js use effect:', err)
	// 		} else {
	// 			console.log('Response from app.js use effect:', err)
	// 		}
	// 		})
	// 	}
	// })
	return (
		<Provider store={configureStore()}>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<Router>
					<Switch>
						<Route path="/" component={App} />
					</Switch>
				</Router>
			</MuiPickersUtilsProvider>
		</Provider>
	)
};

export default MainApp;
