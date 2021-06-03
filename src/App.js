import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "./components/molecules/Navbar";
import Feed from "./components/pages/Feed";
import SignUpPage from "./components/pages/SignUp";
import LoginPage from "./components/pages/Login";
import PrivateRoute from "./components/specials/PrivateRoute";
// context
import AuthState from "./context/auth";
import PostState from "./context/post";

import "./reset.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
	return (
		<AuthState>
			<PostState>
				<Router>
					<div className="App">
						<Navbar />
						<Switch>
							<Route exact path="/signup" component={SignUpPage} />
							<Route exact path="/login" component={LoginPage} />
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
