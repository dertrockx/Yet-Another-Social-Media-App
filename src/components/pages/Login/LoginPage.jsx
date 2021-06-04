import Input from "../../atoms/Input";
import Field from "../../atoms/Field";
import Button from "../../atoms/Button";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../context/auth/authContext";
import "./login.css";

const LoginPage = () => {
	const authContext = useContext(AuthContext);
	const { login = () => {} } = authContext;

	const [messages, setMessages] = useState({
		email: "",
		password: "",
	});
	const [formState, setFormState] = useState({
		email: "",
		password: "",
	});

	// to programatically redirect to login page
	const history = useHistory();

	const handleInputChange = (e) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value,
		});
	};
	const handleErrors = () => {
		let hasErrors = false;
		const { email, password } = formState;
		const newMessages = {
			email: "",
			password: "",
		};

		if (email === "") newMessages.email = "X Email is required";

		if (password === "") newMessages.password = "X Password is required";

		setMessages({ ...newMessages });
		if (newMessages.email !== "" || newMessages.password !== "")
			hasErrors = true;
		return hasErrors;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		// check first if fields are all filled up
		const hasErrors = handleErrors();

		if (hasErrors) {
			return;
		}

		const success = await login(formState);
		if (success) {
			setFormState({
				email: "",
				password: "",
			});
			history.push("/");
		}
	};
	return (
		<div>
			<div className="login-page">
				<h1>Log In</h1>
				<form className="form-container" onSubmit={handleSubmit}>
					<Field messageType="text-red" message={<p>{messages.email || ""}</p>}>
						<Input
							className="bg-grey"
							label="E-mail"
							type="email"
							name="email"
							value={formState.email}
							onChange={handleInputChange}
						/>
					</Field>
					<Field
						messageType="text-red"
						message={<p>{messages.password || ""}</p>}
					>
						<Input
							className="bg-grey"
							label="Password"
							type="password"
							name="password"
							value={formState.password}
							onChange={handleInputChange}
						/>
					</Field>
					<Field>
						<Button type="submit" className="btn btn-block bg-green text-white">
							Log in
						</Button>
					</Field>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
