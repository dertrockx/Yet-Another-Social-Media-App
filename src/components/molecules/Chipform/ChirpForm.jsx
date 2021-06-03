import React, { useState } from "react";
import Button from "../../atoms/Button";

import "./chirp-form.css";

const ChirpForm = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<form onSubmit={handleSubmit} className="chirp-form">
			<label>
				<img
					src="https://picsum.photos/id/237/50/50"
					alt=""
					className="avatar"
				/>
				<textarea type="text" placeholder="What's Happening" />
			</label>
			<Button className="btn bg-green text-white" disabled>
				Chirp
			</Button>
		</form>
	);
};
export default ChirpForm;
