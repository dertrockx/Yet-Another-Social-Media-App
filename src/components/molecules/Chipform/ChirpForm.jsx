import React, { useState, useContext } from "react";
import { PostContext } from "../../../context/post";
import { AuthContext } from "../../../context/auth";
import Button from "../../atoms/Button";

import "./chirp-form.css";
const ChirpForm = () => {
	const postContext = useContext(PostContext);
	const authContext = useContext(AuthContext);
	const { createPost } = postContext;
	const { user } = authContext;
	const [content, setContent] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log("User: ", user);
		// console.log("Content: ", content);
		createPost(user._id, content);
		setContent("");
	};

	return (
		<form onSubmit={handleSubmit} className="chirp-form">
			<label>
				<img
					src="https://picsum.photos/id/237/50/50"
					alt=""
					className="avatar"
				/>
				<textarea
					type="text"
					placeholder="What's Happening"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			</label>
			<Button className="btn bg-green text-white" disabled={content === ""}>
				Chirp
			</Button>
		</form>
	);
};
export default ChirpForm;
