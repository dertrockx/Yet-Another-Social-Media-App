import React from "react";
import "./input.css";

const Input = ({
	type = "text",
	name = "field",
	label = "Label",
	value,
	onChange,
	className,
}) => {
	return (
		<div>
			<label htmlFor={name} className="caption text-grey-darker">
				{label}
			</label>
			<input
				type={type}
				name={name}
				className={`input ${className}`}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default Input;
