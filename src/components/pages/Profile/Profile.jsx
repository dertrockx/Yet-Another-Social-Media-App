import React, { useEffect, useState, useContext } from "react";

import { Feed } from "../../templates";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import { PostContext } from "../../../context/post";
import PostItem from "../../molecules/PostItem";
import Button from "../../atoms/Button";
import EditablePostItem from "../../molecules/EditablePostItem";
const url = process.env.REACT_APP_API_ROUTE;

const getFriendshipStatus = (friends, recipient) => {
	console.log(friends);
	const friendship = friends.filter(
		(friendship) =>
			friendship.recipient._id === recipient ||
			friendship.requestor._id === recipient
	)[0];
	if (!friendship) return ["Send a friend request", "bg-green"];
	switch (friendship.status) {
		case 0:
			return ["Request sent", "bg-yellow"];
		case 1:
			return ["Accept request", "bg-blue"];
		case 2:
			return ["Accepted", "bg-red"];
		default:
	}
};

const getFriendshipObj = (friends, recipient) => {
	const friendship = friends.filter(
		(friendship) =>
			friendship.recipient._id === recipient ||
			friendship.requestor._id === recipient
	)[0];
	return friendship;
};

const Profile = () => {
	const authContext = useContext(AuthContext);
	const postContext = useContext(PostContext);
	const { posts } = postContext;
	const { user, sendFriendRequest, acceptFriendRequest, rejectFriendRequest } =
		authContext;

	const { friends } = user;

	const { email } = useParams();
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState(null);
	const [friendship, setFriendship] = useState(null);
	const [buttonState, setButtonState] = useState({
		text: "Send a friend request",
		background: "bg-green",
	});

	// console.log(email);
	const getUser = async () => {
		try {
			const res = await fetch(`${url}/users?email=${email}`, {
				credentials: "include",
			});
			const data = await res.json();

			const { users } = data;
			console.log(users);
			if (users.length === 0) {
				setLoading(false);
				return;
			}
			const profile = users[0];

			// get friendship status
			const status = getFriendshipStatus(friends, profile._id);
			const [text, background] = status;
			// console.log(text, background);

			setButtonState({
				text,
				background,
			});

			setFriendship(getFriendshipObj(friends, profile._id));

			setProfile(profile);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getUser();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (!profile || !user) return;

		// console.log(user.friends);
		const status = getFriendshipStatus(friends, profile._id);
		const [text, background] = status;
		setFriendship(getFriendshipObj(friends, profile._id));
		setButtonState({
			text,
			background,
		});
		// eslint-disable-next-line
	}, [user]);
	const rejectRequest = () => {
		console.log("Rejecting...");
		if (friendship) {
			rejectFriendRequest(friendship._id, profile._id, user._id);
		}
	};
	const handleButtonClick = () => {
		console.log("Em?");

		if (buttonState.text === "Send a friend request") {
			console.log("Sending friend request...");
			const success = sendFriendRequest(user._id, profile._id);
			console.log(success);
		} else if (buttonState.text === "Accept request") {
			console.log("Accepting friend request");
			acceptFriendRequest(
				getFriendshipObj(friends, profile._id)._id,
				profile._id,
				user._id
			);
		}

		// if (success) {
		// 	const status = getFriendshipStatus(friends, profile._id);
		// 	const [text, background] = status;

		// 	setButtonState({
		// 		text,
		// 		background,
		// 	});
		// }
	};

	if (loading) return <h3>Loading...</h3>;
	return (
		<Feed
			renderMain={
				() => (
					<>
						{profile ? (
							<PostItem
								title={
									(profile && `${profile.firstName} ${profile.lastName}`) ||
									"No name"
								}
								meta={(profile && profile.email) || "no email"}
								renderContent={() => {
									if (user && user.email !== email)
										return (
											<>
												<Button
													className={`btn btn-rounded ${buttonState.background} text-white btn-block`}
													onClick={() => handleButtonClick()}
													// disabled={friends.includes(profile._id)}
												>
													{buttonState.text}
												</Button>
												{friendship && friendship.status === 1 ? (
													<Button
														className={`btn btn-rounded bg-red text-white btn-block`}
														onClick={rejectRequest}
														// disabled={friends.includes(profile._id)}
													>
														Reject
													</Button>
												) : null}
											</>
										);
									return null;
								}}
							/>
						) : (
							<PostItem title="No user found" />
						)}

						{profile && user && user.email === email ? (
							<>
								<h3 className="mg-top-30">Posts</h3>
								{posts
									.filter((post) => post.author._id === user._id)
									.map((post, idx) => (
										<PostItem
											key={idx}
											title={
												(profile &&
													`${profile.firstName} ${profile.lastName}`) ||
												"No name"
											}
											// content={post.content}
											renderContent={() => <EditablePostItem post={post} />}
										/>
									))}
								{/* {user.posts.map((post) => (
									<PostItem
										title={
											(profile && `${profile.firstName} ${profile.lastName}`) ||
											"No name"
										}
										// content={post.content}
										renderContent={() => <EditablePostItem post={post} />}
									/>
								))} */}
							</>
						) : null}
					</>
				)
				// 	if (profile)
				// 		return
				// 	else return <PostItem title="No user found" />;
				// }}
			}
		/>
	);
};

export default Profile;
