import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/molecules/Navbar";
import Feed from "./components/templates/Feed";
import SignUpPage from "./components/pages/SignUp";
import PrivateRoute from "./components/specials/PrivateRoute";
// context
import AuthState from "./context/auth";

import "./reset.css";
import "./App.css";

const App = () => {
	return (
		<AuthState>
			<Router>
				<div className="App">
					<Navbar />
					<Switch>
						<Route exact path="/signup" component={SignUpPage} />
						<PrivateRoute exact path="/" component={Feed} />
					</Switch>
				</div>
			</Router>
		</AuthState>
	);
};

export default App;
