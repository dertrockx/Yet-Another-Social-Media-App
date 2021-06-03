import React, { useEffect, useState, useContext } from "react";
import { Feed } from "../../templates";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import PostItem from "../../molecules/PostItem";
import Button from "../../atoms/Button";
const url = process.env.REACT_APP_API_ROUTE;

const Profile = () => {
	const authContext = useContext(AuthContext);
	const { user = null } = authContext;
	const { email } = useParams();
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState(null);

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
			setProfile(user);
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
								(profile && `${profile.firstName} ${profile.lastName}`) ||
								"No name"
							}
							meta={(profile && profile.email) || "no email"}
							renderContent={() => {
								if (user && user.email !== email)
									return (
										<Button className="btn btn-rounded bg-green text-white btn-block">
											Send friend request
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
