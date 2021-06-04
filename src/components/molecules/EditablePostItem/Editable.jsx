import React, { useState, useContext } from "react";
import { PostContext } from "../../../context/post";

import TextareaAutosize from "react-textarea-autosize";
import Button from "../../atoms/Button";

const Editable = ({ post }) => {
	const [data, setData] = useState(post.content);
	const postContext = useContext(PostContext);
	const { editPost, deletePost } = postContext;
	const [editing, setEditing] = useState(false);
	let ref = null;
	return (
		<>
			<div className="mg-top-30 mg-bottom-30">
				<TextareaAutosize
					value={data}
					onChange={(e) => setData(e.target.value)}
					ref={(tag) => (ref = tag)}
					onFocus={() => setEditing(true)}
				/>
			</div>
			{/* <p>{post.content}</p> */}
			{!editing ? (
				<Button
					className="btn btn-rounded bg-yellow text-white btn-block"
					onClick={() => {
						ref && ref.focus();
						setEditing(true);
					}}
				>
					Edit
				</Button>
			) : (
				<Button
					className="btn btn-rounded bg-green text-white btn-block"
					onClick={() => editPost(post._id, data)}
				>
					Save
				</Button>
			)}
			<Button
				className="btn btn-rounded bg-red text-white btn-block"
				onClick={() => deletePost(post._id)}
			>
				Delete
			</Button>
		</>
	);
};

export default Editable;
