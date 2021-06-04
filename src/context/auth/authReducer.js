import {
	SIGNUP_SUCCESS,
	SIGNUP_ERROR,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	LOGOUT,
	LOAD_USER,
	SEND_FRIEND_REQUEST,
	ACCEPT_FRIEND_REQUEST,
} from "../types";
import { toast } from "react-toastify";
import { cookie } from "../../utils/cookies";

const reducer = (state, action) => {
	switch (action.type) {
		case SIGNUP_SUCCESS:
			toast.success("😊 Sign up success! You may now log in ", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
			});
			return state;
		case LOGIN_SUCCESS: {
			cookie.set("authToken", action.payload.token);
			toast.success("❤️ Login success! Welcome to Socialapp", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
			});
			return {
				...state,
				user: action.payload.user,
				token: cookie.get("authToken"),
				isAuthenticated: true,
			};
		}
		case LOGOUT: {
			cookie.set("authToken", "");
			toast.success("👋 Logout success! Thank you for using Socialapp!", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
			});
			return {
				...state,
				user: null,
				token: cookie.get("authToken"),
				isAuthenticated: false,
			};
		}
		case LOGIN_ERROR:
		case SIGNUP_ERROR:
			const { payload } = action;
			toast.error(`☠️ ${payload.msg}`, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
			});
			return state;
		case SEND_FRIEND_REQUEST:
			toast.success("😊 Friend request sent!", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
			});
			return {
				...state,
				user: {
					...state.user,
					friends: [...state.user.friends, action.payload],
				},
			};
		case ACCEPT_FRIEND_REQUEST:
			toast.success("😊 Friend request accepted", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
			});
			console.log(action.payload);
			return {
				...state,
				user: {
					...state.user,
					friends: state.user.friends.map((friendship) => {
						let status = friendship.status;
						if (friendship._id === action.payload) status = 2;
						return {
							...friendship,
							status,
						};
					}),
				},
			};
		case LOAD_USER:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
