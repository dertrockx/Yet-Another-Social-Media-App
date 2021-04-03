import React, { useContext } from "react";

import AuthContext from "../../../context/auth/authContext";
import { NavLink, useHistory } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
	const authContext = useContext(AuthContext);
	const history = useHistory();
	const { isAuthenticated = false, logout = () => {} } = authContext;
	const handleLogout = () => {
		logout();
		history.push("/login");
	};
	return (
		<nav className="navbar">
			<div className="left">
				<span className="logo-text">
					Social
					<span className="light">app</span>
				</span>
			</div>
			<div className="right">
				{isAuthenticated ? (
					<>
						<p className="item">Feed</p>
						<p className="item">Profile</p>
						<p className="item">Help</p>
						<p className="item" onClick={handleLogout}>
							Logout
						</p>
					</>
				) : (
					<>
						<NavLink
							className="item"
							activeClassName="is-active"
							to="/login"
							exact
						>
							Login
						</NavLink>
						<NavLink
							className="item"
							activeClassName="is-active"
							to="/signup"
							exact
						>
							Signup
						</NavLink>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
