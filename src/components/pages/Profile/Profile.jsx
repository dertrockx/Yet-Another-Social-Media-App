import React, { useEffect, useState, useContext } from "react";
import { Feed } from "../../templates";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import PostItem from "../../molecules/PostItem";
import Button from "../../atoms/Button";
const url = process.env.REACT_APP_API_ROUTE;

const getFriendshipStatus = (friends, recipient) => {
	const friendship = friends.filter(
		(friendship) => friendship.recipient._id === recipient
	)[0];
	if (!friendship) return ["Send a friend request", "bg-green"];
	switch (friendship.status) {
		case 0:
			return ["Request sent", "bg-blue"];
		case 1:
			return ["Pending request", "bg-yellow"];
		case 2:
			return ["Accepted", "bg-red"];
		default:
	}
};

const Profile = () => {
	const authContext = useContext(AuthContext);
	const { user, sendFriendRequest } = authContext;
	const { friends } = user;

	const { email } = useParams();
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState(null);
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
			const profile = users[0];

			// get friendship status
			const status = getFriendshipStatus(friends, profile._id);
			const [text, background] = status;

			setButtonState({
				text,
				background,
			});

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

		setButtonState({
			text,
			background,
		});
	}, [user]);

	const handleButtonClick = () => {
		console.log("Em?");

		if (buttonState.text !== "Send a friend request") return;
		console.log("Sending friend request...");
		const success = sendFriendRequest(user._id, profile._id);
		console.log(success);
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
			renderMain={() => {
				if (user)
					return (
						<PostItem
							title={
								(profile && `${profile.firstName} ${profile.lastName}`) ||
								"No name"
							}
							meta={(profile && profile.email) || "no email"}
							renderContent={() => {
								if (user && user.email !== email)
									return (
										<Button
											className={`btn btn-rounded ${buttonState.background} text-white btn-block`}
											onClick={() => handleButtonClick()}
											// disabled={friends.includes(profile._id)}
										>
											{buttonState.text}
										</Button>
									);
								return null;
							}}
						/>
					);
				else return <PostItem title="No user found" />;
			}}
		/>
	);
};

export default Profile;
