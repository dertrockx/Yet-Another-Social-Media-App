import React, { useEffect, useState } from "react";
import { Feed } from "../../templates";
import { useParams } from "react-router-dom";

import PostItem from "../../molecules/PostItem";
import Button from "../../atoms/Button";
const url = process.env.REACT_APP_API_ROUTE;

const Profile = () => {
	const { email } = useParams();
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	// console.log(email);
	const getUser = async () => {
		try {
			const res = await fetch(`${url}/users?email=${email}`, {
				credentials: "include",
			});
			const data = await res.json();
			console.log(data);
			const { users } = data;
			const user = users[0];
			console.log(data);
			setUser(user);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		// eslint-disable-next-line
		getUser();
	}, []);
	if (loading) return <h3>Loading...</h3>;
	return (
		<Feed
			renderMain={() => {
				if (user)
					return (
						<PostItem
							title={
								(user && `${user.firstName} ${user.lastName}`) || "No name"
							}
							meta={(user && user.email) || "no email"}
							renderContent={() => (
								<Button className="btn btn-rounded bg-green text-white btn-block">
									Send friend request
								</Button>
							)}
						/>
					);
				else return <PostItem title="No user found" />;
			}}
		/>
	);
};

export default Profile;
