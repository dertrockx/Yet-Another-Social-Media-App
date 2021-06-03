import React from "react";
import PropTypes from "prop-types";
import UserAvatar from "../../atoms/UserAvatar";

const PostItem = ({ title, meta, hasLine, content, renderContent }) => {
	return (
		<div className="post-item">
			<UserAvatar title={title} meta={meta} />
			{hasLine ? <hr /> : null}
			{renderContent ? renderContent() : <p>{content}</p>}
		</div>
	);
};

PostItem.propTypes = {
	title: PropTypes.string,
	meta: PropTypes.string,
	hasLine: PropTypes.bool,
	content: PropTypes.string,
	renderContent: PropTypes.func,
};

export default PostItem;
