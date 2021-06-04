import React, { useContext, useEffect } from "react";
import { PostContext } from "../../../context/post";
import { AuthContext } from "../../../context/auth";
import { useHistory } from "react-router-dom";
import UserAvatar from "../../atoms/UserAvatar";
import PostItem from "../../molecules/PostItem";
import ChirpForm from "../../molecules/Chipform";
import Button from "../../atoms/Button";
import { Feed } from "../../templates";

const Main = () => {
	const postContext = useContext(PostContext);
	const authContext = useContext(AuthContext);
	const history = useHistory();
	const { getPosts, posts } = postContext;
	const { user, loadUser } = authContext;
	useEffect(() => {
		loadUser();
		getPosts();
		// eslint-disable-next-line
	}, []);

	const goToProfile = (email) => {
		history.push(`/profile/${email}`);
	};
	return (
		<Feed
			renderLeftContent={() => (
				<>
					<h2>Friends List</h2>
					<div className="mg-top-30">
						{user && user.friends && user.friends.length > 0 ? (
							user.friends.map((friendship, idx) => {
								if (friendship.status === 2) {
									const profile =
										friendship.requestor._id !== user._id
											? friendship.requestor
											: friendship.recipient;
									return (
										<UserAvatar
											onClick={() => goToProfile(profile.email)}
											key={idx}
											title={`${profile.firstName} ${profile.lastName}`}
											className="mg-top-20"
										/>
									);
								}
								return null;
							})
						) : (
							<p>No friends {"asdadsa"} sadge </p>
						)}
					</div>
				</>
			)}
			renderMain={() => (
				<>
					<ChirpForm />
					{posts && posts.length > 0
						? posts.map((post, index) => (
								<PostItem
									handleAvatarClick={() => goToProfile(post.author.email)}
									key={index}
									hasLine
									title={
										post && post.author
											? `${post.author.firstName} ${post.author.lastName}`
											: "Unknown user"
									}
									// meta={post.meta.toISOString()}
									content={post.content}
								/>
						  ))
						: null}
				</>
			)}
			renderRightContent={() => (
				<>
					<h2>Pending Requests</h2>

					{user && user.friends.length > 0 ? (
						user.friends.map((friendship, idx) => {
							if (friendship.status === 1)
								return (
									<PostItem
										handleAvatarClick={() =>
											goToProfile(friendship.requestor.email)
										}
										key={idx}
										title={`${friendship.requestor.firstName} ${friendship.requestor.lastName}`}
									/>
								);
							return null;
						})
					) : (
						<p>No pending requests</p>
					)}
				</>
			)}
		/>
	);
};

export default Main;
