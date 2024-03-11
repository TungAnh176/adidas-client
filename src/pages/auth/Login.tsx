import React, { useContext, useState } from "react";
import WhiteButton from "../../components/Buttons/WhiteButton";
import AuthInput from "../../components/Inputs/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import BoxModel from "../../components/BoxModel";

const Login = () => {
	const navigate = useNavigate();
	const { login } = useContext(UserContext);
	const [isOpenModel, setIsOpenModel] = useState(false);
	const [formState, setFormState] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({
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
		login(formState).catch((error) => {
			setErrors({
				email: error.message,
				password: error.message,
			});
		});
		navigate("/");
	};
	const handleLoginSocial = (social: string) => {};
	return (
		<>
			<div className="flex items-center justify-center min-h-screen">
				{/* log in section */}
				<div className="w-1/2 flex flex-col items-center mx-auto">
					<h1 className="text-3xl font-bold">Đăng nhập</h1>
					{/* log in form */}
					<form
						className="w-full"
						action=""
						onSubmit={handleLogin}
					>
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
							text="Đăng nhập"
						/>
					</form>
					{/* log in with socials */}
					<div className="border-t w-full my-6">
						<p className="text-gray-400 text-center">Đăng nhập với mạng xã hội</p>
						{/* log in with google */}
						<div
							onClick={() => handleLoginSocial("google")}
							className="flex items-center justify-between w-full "
						>
							<button
								type="button"
								className="flex justify-between items-center h-12 w-full mt-6 border border-solid border-gray-300 rounded-full 
								bg-blue-500 text-white hover:opacity-50  transition duration-300 ease-in-out shadow-lg"
							>
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png?20230822192911"
									alt="google logo"
									className="mr-4 -ml-2 w-[60px] h-[60px] bg-white  rounded-full  object-cover"
								/>
								<p className="select-none font-semibold">Đăng nhập với Google</p>
								<div className="w-6"></div>
							</button>
						</div>
						<div
							onClick={() => handleLoginSocial("facebook")}
							className="flex items-center justify-between w-full "
						>
							<button
								type="button"
								className="flex justify-between items-center h-12 w-full mt-6 border border-solid border-gray-300 rounded-full 
								bgwhite text-white hover:opacity-50  transition duration-300 ease-in-out shadow-lg"
							>
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/480px-Facebook_Logo_%282019%29.png"
									alt="google logo"
									className="-ml-2 mr-4 w-[60px] h-[60px] rounded-full object-cover"
								/>
								<p className="select-none font-semibold text-black">Đăng nhập với Facebook</p>
								<div className="w-6"></div>
							</button>
						</div>
					</div>
					<div className="flex justify-between items w-full">
						<Link to="/signup">
							<p className="text-blue-500 cursor-pointer select-none">Đăng ký tài khoản ..</p>
						</Link>
						<p className="text-blue-500 cursor-pointer select-none">Quên mật khẩu</p>
					</div>
				</div>
			</div>
			<BoxModel {...{ isOpenModel, setIsOpenModel }}>
				<div className="bg-white rounded-xl shadow-lg w-1/3 flex flex-col">
					<h1 className="font-bold text-xl">Xác thực số điện thoại</h1>
				</div>
			</BoxModel>
		</>
	);
};

export default Login;
