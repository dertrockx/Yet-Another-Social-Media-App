import React from "react";

const Feed = ({
	renderRightContent = () => {},
	renderLeftContent = () => {},
	renderMain = () => {},
}) => {
	return (
		<div className="container body">
			<aside className="friends">
				{renderLeftContent && renderLeftContent()}
			</aside>
			<main className="content">{renderMain && renderMain()}</main>
			<aside className="ads">
				{renderRightContent && renderRightContent()}
			</aside>
		</div>
	);
};

export default Feed;
