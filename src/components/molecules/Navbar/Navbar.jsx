import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../../context/auth/authContext";
import { NavLink, useHistory } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
	const authContext = useContext(AuthContext);
	const history = useHistory();
	// focus input handle
	const [focused, setFocused] = useState(false);
	const [query, setQuery] = useState("");
	const {
		isAuthenticated = false,
		logout = () => {},
		loadUser,
		user,
	} = authContext;
	const handleLogout = () => {
		logout();
		history.push("/login");
	};

	// const goToMyPage = () => {
	// 	if (!user) return;
	// 	history.push(`/profile/${user.email}`);
	// };

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && focused && query !== "") {
			// search user
			history.push(`/profile/${query}`);
		}
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
						<div className="item">
							<input
								type="text"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								onFocus={() => setFocused(true)}
								onBlur={() => setFocused(false)}
								onKeyDown={handleKeyDown}
							/>
						</div>
						<NavLink className="item" activeClassName="is-active" to="/" exact>
							Feed
						</NavLink>

						<NavLink className="item" to={`/profile/${user.email}`} exact>
							Profile
						</NavLink>
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
