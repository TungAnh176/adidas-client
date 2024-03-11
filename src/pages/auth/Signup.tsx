import React, { useState } from "react";
import { Link } from "react-router-dom";
import WhiteButton from "../../components/Buttons/WhiteButton";
import AuthInput from "../../components/Inputs/AuthInput";

const Signup = () => {
	const [formState, setFormState] = useState({
		name: "",
		phoneNum: "",
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({
		name: "",
		phoneNum: "",
		email: "",
		password: "",
	});
	const onFormStateChange = (e: any) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value,
		});
	};
	const handleLogin = (e: any) => {
		e.preventDefault();
	};
	return (
		<>
			<div className="flex items-center justify-center min-h-screen">
				{/* log in section */}
				<div className="w-1/2 flex flex-col items-center mx-auto">
					<h1 className="text-3xl font-bold">Đăng ký</h1>
					{/* login form */}
					<form
						className="w-full"
						action=""
						onSubmit={handleLogin}
					>
						<AuthInput
							onChange={onFormStateChange}
							name="name"
							placeholder="Họ và tên..."
						/>
						{errors.name && (
							<label
								htmlFor="name"
								className="text-red-500 ml-4"
							>
								{errors.name}
							</label>
						)}
						<AuthInput
							onChange={onFormStateChange}
							name="phoneNum"
							placeholder="Số điện thoại..."
							type="tel"
						/>
						{errors.phoneNum && (
							<label
								htmlFor="phoneNum"
								className="text-red-500 ml-4"
							>
								{errors.phoneNum}
							</label>
						)}
						<AuthInput
							type="email"
							onChange={onFormStateChange}
							name="email"
							placeholder="Email..."
						/>
						{errors.email && (
							<label
								htmlFor="email"
								className="text-red-500 ml-4"
							>
								{errors.email}
							</label>
						)}
						<AuthInput
							onChange={onFormStateChange}
							name="password"
							placeholder="Password..."
							type="password"
						/>
						{errors.password && (
							<label
								htmlFor="password"
								className="text-red-500 ml-4"
							>
								{errors.password}
							</label>
						)}
						<WhiteButton
							rounded="full"
							type="submit"
							text="Đăng ký"
						/>
					</form>
					<div className="flex justify-between items w-full">
						<Link to="/login">
							<p className="text-blue-500 cursor-pointer select-none">Đăng nhập</p>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;
