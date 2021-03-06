import React from "react";
import PropTypes from "prop-types";

import "./user-avatar.css";
const UserAvatar = ({ title, meta, className, onClick }) => {
	return (
		<div className={`user-avatar ${className}`} onClick={onClick}>
			<img src="https://picsum.photos/id/237/50/50" alt="" className="avatar" />
			<div className="info">
				<h3>{title}</h3>
				<div className="caption">{meta}</div>
			</div>
		</div>
	);
};

UserAvatar.propTypes = {
	title: PropTypes.string,
	meta: PropTypes.string,
	className: PropTypes.string,
	onClick: PropTypes.func,
};

export default UserAvatar;
