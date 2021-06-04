import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../../atoms/Button";

const Editable = ({ content, onSave, onDelete }) => {
	const [editing, setEditing] = useState(false);
	let ref = null;
	return (
		<>
			<TextareaAutosize value={content} ref={(tag) => (ref = tag)} />
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
					onClick={() => setEditing(false)}
				>
					Save
				</Button>
			)}
			<Button
				className="btn btn-rounded bg-red text-white btn-block"
				onClick={onDelete}
			>
				Delete
			</Button>
		</>
	);
};

export default Editable;
