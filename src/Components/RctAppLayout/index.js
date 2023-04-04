/**
 * App Routes
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from 'react-sidebar';
import { Scrollbars } from 'react-custom-scrollbars';
import classnames from 'classnames';

// Components
import Header from 'Components/Header/Header';
import SidebarContent from 'Components/Sidebar';
import Footer from 'Components/Footer/Footer';
import Tour from 'Components/Tour';
import ThemeOptions from 'Components/ThemeOptions/ThemeOptions';

// preload Components
import PreloadHeader from 'Components/PreloadLayout/PreloadHeader';
import PreloadSidebar from 'Components/PreloadLayout/PreloadSidebar';


// app config
import AppConfig from 'Constants/AppConfig';

// actions
import { collapsedSidebarAction, startUserTour } from 'Store/Actions';



// Don't forget the CSS: core and the UI components + plugins you are using.
// import { Dashboard } from "@uppy/react";
import Uppy from  "@uppy/core";
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import { DragDrop, StatusBar ,Dashboard} from '@uppy/react';
import Tus from '@uppy/tus'
const {	DashboardModal} = require("@uppy/react");
// Don’t forget to keep the Uppy instance outside of your component.
// const uppy = new Uppy()
// // .use(RemoteSources, { companionUrl: 'https://companion.uppy.io' })
// // .use(Webcam, { target: Dashboard })
// // .use(ImageEditor, { target: Dashboard })
// .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
// .on('complete', (result) => {
//   console.log('Upload result:', result)
// });


class MainApp extends Component {

	state = {
		loadingHeader: true,
		loadingSidebar: true,
		open:undefined
	}


	handleModalClick = () => {
		this.setState({
			open: !this.state.open,
		});
	}

	UNSAFE_componentWillMount() {
		this.updateDimensions();
	}

	componentDidMount() {
		const { windowWidth } = this.state;
		window.addEventListener("resize", this.updateDimensions);
		if (AppConfig.enableUserTour && windowWidth > 600) {
			setTimeout(() => {
				this.props.startUserTour();
			}, 2000);
		}
		setTimeout(() => {
			this.setState({ loadingHeader: false, loadingSidebar: false });
		}, 114);
   }
   
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { windowWidth } = this.state;
		if (nextProps.location !== this.props.location) {
			if (windowWidth <= 1199) {
				this.props.collapsedSidebarAction(false);
			}
		}
	}

	updateDimensions = () => {
		this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			window.scrollTo(0, 0);
		}
	}

	renderPage() {
		const { pathname } = this.props.location;
		const { children } = this.props;
		if (pathname === '/app/chat' || pathname.startsWith('/app/mail') || pathname === '/app/todo') {
			return (
				<div className="rct-page-content p-0">
					{children}
				</div>
			);
		}
		return (
			<Scrollbars
				className="rct-scroll"
				autoHide
				autoHideDuration={100}
				style={this.getScrollBarStyle()}
			>
				<div className="rct-page-content">
					{children}
					<Footer />
				</div>
			</Scrollbars>
		);
	}

	// render header
	renderHeader() {
		const { loadingHeader } = this.state;
		if (loadingHeader) {
			return <PreloadHeader />;
		}
		return <Header />
	}

	//render Sidebar
	renderSidebar() {
		const { loadingSidebar } = this.state;
		if (loadingSidebar) {
			return <PreloadSidebar />;
		}
		return <SidebarContent />
	}

	//Scrollbar height
	getScrollBarStyle() {
		return {
			height: 'calc(100vh - 50px)'
		}
	}

	render() {
		const { navCollapsed, rtlLayout, miniSidebar } = this.props.settings;
		const { windowWidth ,open} = this.state;


		if (open === undefined) {
			this.uppy3 = new Uppy({
				id: "uppy3",
				autoProceed: false,
				debug: true,
				methods: ["OPTIONS", "GET", "POST", "PATCH", "PUT"],
				exposedHeaders: ["Access-Control-Allow-Headers"],
				allowedHeaders: [
					"uppy-auth-token",
					"Content-Type",
					"Authorization",
					"Uppy-Versions",
					"Accept",
					"project_id",
					"folder_id",
				],
			})
			.use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
			// .on('complete', (result) => {
			//   console.log('Upload result:', result)
			// });
				.on("upload-success", (file, response) => {
					console.log("upload-success");
					// alert(JSON.stringify(file,response))
					//   this.props.projectSpecificDetails(
					// 	this.props.match.params.id,
					// 	(res, err) => {
					// 	  console.log("res");
					// 	  this.setState({
					// 		open: !this.state.open,
					// 	  });
					// 	}
					//   );
				});
		}
	
	

		return (
			<div className="app">
				<div className="app-main-container">
					{/* <Tour /> */}
					<Sidebar
						sidebar={this.renderSidebar()}
						open={windowWidth <= 1199 ? navCollapsed : false}
						docked={windowWidth > 1199 ? !navCollapsed : false}
						pullRight={rtlLayout}
						onSetOpen={() => this.props.collapsedSidebarAction(false)}
						styles={{ content: { overflowY: '' } }}
						contentClassName={classnames({ 'app-conrainer-wrapper': miniSidebar })}
					>
						<div className="app-container">
							<div className="rct-app-content">
								<div className="app-header">
								{/* <DashboardModal
										uppy={uppy}
										open={true}
										// target={document.body}
										// onRequestClose={() => this.setState({ open: false })}
									/> */}
									{/* <button onClick={this.handleModalClick}>
										{this.state.open === undefined ? "Show" : this.state.open ? "Hide": "Show"}
									</button> */}
									<DashboardModal
										uppy={this.uppy3}
										open={this.state.open}
										target={document.body}
										onRequestClose={() => this.setState({ open: false })}
									/>

									{this.renderHeader()}
								</div>
								<div className="rct-page">
									{this.renderPage()}
								</div>
							</div>
						</div>
					</Sidebar>
					{/* <ThemeOptions /> */}
				</div>
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings }) => {
	return { settings }
}

export default withRouter(connect(mapStateToProps, {
	collapsedSidebarAction,
	startUserTour
})(MainApp));
