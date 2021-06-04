import React from "react";
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import { createBrowserHistory as createHistory } from "history";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "./components/molecules/Navbar";
import Feed from "./components/pages/Feed";
import SignUpPage from "./components/pages/SignUp";
import LoginPage from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import PrivateRoute from "./components/specials/PrivateRoute";
// context
import AuthState from "./context/auth";
import PostState from "./context/post";

import "./reset.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const history = createHistory();
const App = () => {
	return (
		<AuthState>
			<PostState>
				<Router history={history}>
					<div className="App">
						<Navbar />
						<Switch>
							<Route exact path="/signup" component={SignUpPage} />
							<Route exact path="/login" component={LoginPage} />
							<PrivateRoute path="/profile/:email" component={Profile} />
							<PrivateRoute exact path="/" component={Feed} />
						</Switch>
						<ToastContainer
							position="bottom-center"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
						/>
					</div>
				</Router>
			</PostState>
		</AuthState>
	);
};

export default App;
