import React, { useReducer } from "react";

import PostContext from "./postContext";

import { GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST } from "../types";
import postReducer from "./postReducer";
const url = process.env.REACT_APP_API_ROUTE;

const PostState = (props) => {
	/**
	 * post: {
	 *  author: User,
	 *  content: string
	 *  timestamps
	 * }
	 */
	const initialState = {
		posts: [],
	};

	const [state, dispatch] = useReducer(postReducer, initialState);

	const getPosts = async () => {
		try {
			const res = await fetch(`${url}/posts`, {
				credentials: "include",
			});
			const data = await res.json();

			dispatch({
				type: GET_POSTS,
				payload: data.posts,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const createPost = async (author_id, content) => {
		const headers = {
			"Content-Type": "application/json",
		};
		const formData = {
			author: author_id,
			content,
		};
		try {
			const res = await fetch(`${url}/posts/create`, {
				method: "POST",
				headers,
				body: JSON.stringify(formData),
				credentials: "include",
			});
			const data = await res.json();

			dispatch({
				type: CREATE_POST,
				payload: data.post,
			});
		} catch (err) {
			console.log(err);
		}
	};

	/**
	 *
	 * @param {*} id string
	 * @param {*} content string
	 */
	const editPost = async (id, content) => {
		const headers = {
			"Content-Type": "application/json",
		};
		const formData = {
			content,
		};
		try {
			const res = await fetch(`${url}/posts/${id}`, {
				method: "PATCH",
				headers,
				body: JSON.stringify(formData),
				credentials: "include",
			});
			const data = await res.json();

			if (data && data.success) {
				dispatch({
					type: UPDATE_POST,
					payload: data.post,
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	const deletePost = async (id) => {
		try {
			const res = await fetch(`${url}/posts/${id}`, {
				method: "DELETE",

				credentials: "include",
			});
			const data = await res.json();

			if (data && data.success) {
				dispatch({
					type: DELETE_POST,
					payload: data.post._id,
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<PostContext.Provider
			value={{
				...state,
				getPosts,
				createPost,
				editPost,
				deletePost,
			}}
		>
			{props.children}
		</PostContext.Provider>
	);
};

export default PostState;
