import React, { Component } from "react";
import UserAvatar from "../../atoms/UserAvatar";
import PostItem from "../../molecules/PostItem";
import ChirpForm from "../../molecules/Chipform";
import Button from "../../atoms/Button";

const posts = [
	{
		name: "Ian Salazar",
		meta: new Date(),
		content:
			"My ingenuity is a thrill, and I want to wake up. Seeing fine dates, you understand. #happydancing #randomtweet",
	},
	{
		name: "Ivan Grey",
		meta: new Date(),
		content:
			"My dad is amazing, and I want to get more sleep. Let there be grand weirdness, or something. #myism #randomtweet",
	},
	{
		name: "Bianca Arce",
		meta: new Date(),
		content:
			"My dad is funky, and I want to go to Mars. Let there be mail order glamour, in a way. #happyfest #randomtweet",
	},
	{
		name: "Arni Mendoza",
		meta: new Date(),
		content:
			"My job is a shadow, and I want to start a business. Fabulous grand trials, in the end. #randombling #randomtweet",
	},
	{
		name: "Leah Somoson",
		meta: new Date(),
		content:
			"My home is over the top, and I want to wake up. Come for the perfect glitter, my friend. #jinglerun #randomtweet",
	},
];
const ads = [
	{
		name: "Benjie for President",
		meta: new Date(),
		content:
			"My ingenuity is a thrill, and I want to wake up. Seeing fine dates, you understand. #happydancing #randomtweet",
	},
	{
		name: "Sophia's B-day",
		meta: new Date(),
		content:
			"My dad is amazing, and I want to get more sleep. Let there be grand weirdness, or something. #myism #randomtweet",
	},
	{
		name: "Reamonn's Fine Art Museum",
		meta: new Date(),
		content:
			"My dad is funky, and I want to go to Mars. Let there be mail order glamour, in a way. #happyfest #randomtweet",
	},
	{
		name: "Joan's Awesome Store",
		meta: new Date(),
		content:
			"My job is a shadow, and I want to start a business. Fabulous grand trials, in the end. #randombling #randomtweet",
	},
	{
		name: "Reinalyn, Corporation",
		meta: new Date(),
		content:
			"My home is over the top, and I want to wake up. Come for the perfect glitter, my friend. #jinglerun #randomtweet",
	},
];
export default class Content extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="container body">
				<aside className="friends">
					<h2>Friends List</h2>
					<div className="mg-top-30">
						{posts.map((post, index) => (
							<UserAvatar
								id={index}
								title={post.name}
								meta={post.meta.toISOString()}
								className="mg-top-20"
							/>
						))}
					</div>
					<Button className="mg-top-30 btn btn-large btn-rounded bg-green text-white">
						Chirp
					</Button>
				</aside>
				<main className="content">
					<ChirpForm />
					{posts.map((post, index) => (
						<PostItem
							hasLine
							title={post.name}
							meta={post.meta.toISOString()}
							content={post.content}
						/>
					))}
				</main>
				<aside className="ads">
					<h2>Promotions</h2>
					{ads.map((ad, index) => (
						<PostItem
							title={ad.name}
							meta={ad.meta.toISOString()}
							content={ad.content}
						/>
					))}
				</aside>
			</div>
		);
	}
}
