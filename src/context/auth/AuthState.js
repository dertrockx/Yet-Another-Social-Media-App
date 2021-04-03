import React, { useReducer } from "react";
import { cookie } from "../../utils/cookies";

import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
	SIGNUP_SUCCESS,
	SIGNUP_ERROR,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	LOGOUT,
} from "../types";
const url = process.env.REACT_APP_API_ROUTE;

const AuthState = (props) => {
	const initialState = {
		token: cookie.get("authToken") || "",
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
			const data = await res.json();
			const { success = false } = data;

			if (res.status === 404 || res.status === 400) {
				dispatch({
					type: SIGNUP_ERROR,
					payload: data,
				});
			}
			if (success) {
				dispatch({
					type: SIGNUP_SUCCESS,
				});
				return success;
			}
		} catch (err) {
			console.log(err);
		}
	};
	const login = async (formData) => {
		const headers = {
			"Content-Type": "application/json",
		};

		try {
			const res = await fetch(`${url}/users/login`, {
				method: "POST",
				headers,
				body: JSON.stringify(formData),
			});
			const data = await res.json();

			const { success = false } = data;

			if (res.status === 404 || res.status === 400) {
				dispatch({
					type: LOGIN_ERROR,
					payload: data,
				});
			}

			if (success) {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: data,
				});
				console.log(data);
			}
			return success;
		} catch (err) {
			console.log(err);
		}
	};

	const logout = () =>
		dispatch({
			type: LOGOUT,
		});

	return (
		<AuthContext.Provider
			value={{
				...state,
				signup,
				login,
				logout,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
