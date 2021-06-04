import { GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST } from "../types";
import { toast } from "react-toastify";
const reducer = (state, action) => {
	switch (action.type) {
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
			};

		case CREATE_POST:
			toast.success("😊 Post created successfully!", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
			});
			return {
				...state,
				posts: [action.payload, ...state.posts],
			};
		case UPDATE_POST:
			toast.success("😊 Post edited successfully!", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
			});
			return {
				...state,
				posts: state.posts.map((post) => {
					if (post._id === action.payload._id) return action.payload;
					return post;
				}),
			};
		case DELETE_POST:
			toast.success("Post deleted successfully!", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				progress: undefined,
			});
			console.log(action.payload);
			let posts = state.posts.filter((post) => post._id !== action.payload);
			console.log(posts);
			return {
				...state,
				posts,
			};
		default:
			return state;
	}
};

export default reducer;
