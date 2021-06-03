import { GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST } from "../types";

const reducer = (state, action) => {
	switch (action.type) {
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
			};

		case CREATE_POST:
			return {
				...state,
				posts: [...state.posts, action.payload],
			};
		case UPDATE_POST:
			return {
				...state,
				posts: state.posts.map((post) => {
					if (post._id === action.payload._id) return action.payload;
					return post;
				}),
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload),
			};
		default:
			return state;
	}
};

export default reducer;
