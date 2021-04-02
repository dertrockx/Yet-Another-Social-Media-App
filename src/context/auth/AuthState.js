import React, { useReducer } from "react";
import { cookie } from "../../utils/cookies";

import AuthContext from "./authContext";
import authReducer from "./authReducer";

const url = process.env.REACT_APP_API_ROUTE;

const AuthState = (props) => {
	const initialState = {
		token: cookie.get("authToken"),
		isAuthenticated: false,
		user: null,
		error: null,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	const signup = async (formData) => {
		const headers = {
			"Content-Type": "application/json",
		};

		try {
			const res = await fetch(`${url}/users/signup`, {
				method: "POST",
				headers,
				body: JSON.stringify(formData),
			});
			console.log(res.json());
		} catch (err) {
			console.log(err);
		}
	};
	const login = async (formData) => {
		const headers = {
			"Content-Type": "application/json",
		};

		try {
			const res = await fetch(`${url}/users/signup`, {
				method: "POST",
				headers,
				body: JSON.stringify(formData),
			});
			console.log(res.json());
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				signup,
				login,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
