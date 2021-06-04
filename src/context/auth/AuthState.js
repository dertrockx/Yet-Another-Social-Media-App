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
	LOAD_USER,
	SEND_FRIEND_REQUEST,
	ACCEPT_FRIEND_REQUEST,
	REJECT_FRIEND_REQUEST,
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
	const loadUser = async () => {
		try {
			const res = await fetch(`${url}/users/checkAuth`, {
				credentials: "include",
			});
			const data = await res.json();
			/**
			 * data: {
			 *  isLoggedIn: boolean,
			 *  user: {
			 *    posts: Post[],
			 *    email: string,
			 *    firstName: string,
			 *    lastName: string,
			 *    friends: User[],
			 *    _id: string
			 *  }
			 * }
			 */
			if (data && data.isLoggedIn) {
				dispatch({
					type: LOAD_USER,
					payload: data.user,
				});
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

	const sendFriendRequest = async (requestor, recipient) => {
		const formData = {
			requestor,
			recipient,
		};

		try {
			const res = await fetch(`${url}/friends/add`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
				credentials: "include",
			});
			const data = await res.json();

			if (data && data.success) {
				dispatch({
					type: SEND_FRIEND_REQUEST,
					payload: data.friendship,
				});
			}
			return data.success;
		} catch (err) {
			console.log(err);
		}
	};

	const acceptFriendRequest = async (friendship_id, requestor, recipient) => {
		const formData = {
			requestor,
			recipient,
		};

		try {
			const res = await fetch(`${url}/friends/accept`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
				credentials: "include",
			});
			const data = await res.json();

			if (data && data.success) {
				dispatch({
					type: ACCEPT_FRIEND_REQUEST,
					payload: friendship_id,
				});
			}
			//
			// return data.success;
		} catch (err) {
			console.log(err);
		}
	};

	const rejectFriendRequest = async (friendship_id, requestor, recipient) => {
		const formData = {
			requestor,
			recipient,
		};

		try {
			const res = await fetch(`${url}/friends/delete`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
				credentials: "include",
			});
			const data = await res.json();

			if (data && data.success) {
				dispatch({
					type: REJECT_FRIEND_REQUEST,
					payload: friendship_id,
				});
			}
			//
			// return data.success;
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
				logout,
				loadUser,
				sendFriendRequest,
				acceptFriendRequest,
				rejectFriendRequest,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
