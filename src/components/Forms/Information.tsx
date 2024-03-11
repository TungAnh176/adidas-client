import React, { useContext, useState } from "react";
import ImportantTextBox from "../ImportantTextBox";
import DatePicker from "react-datepicker";
import { UserContext } from "../../context";

const Information = () => {
	const { user } = useContext(UserContext);
	const [formState, setFormState] = useState({
		...user,
	});
	const onFormStateChange = <T = any,>(key: string, value: T) => {
		setFormState({ ...formState, [key]: value });
	};
	return (
		<div className="bg-gray-200 rounded-lg p-4 w-full ml-4">
			<h2 className="font-bold text-2xl">Thông tin của tôi</h2>
			<p className="text-sm my-2">Hãy chỉnh sửa bất kỳ thông tin chi tiết nào bên dưới để tài khoản của bạn luôn được cập nhật.</p>
			<p className="mt-2 text-xl font-semibold">Thông tin cơ bản</p>
			{/* user information form */}
			<form className="flex flex-col">
				<div className="flex flex-col">
					<ImportantTextBox
						text="Họ và tên"
						htmlFor="name"
					/>
					<input
						type="text"
						name="name"
						id=""
						className="rounded-lg bg-gray-100 px-2 py-2"
						value={formState.name}
						onChange={(e) => onFormStateChange("name", e.target.value)}
					/>
				</div>
				<div className="grid grid-cols-3 mt-4">
					<div className="flex flex-col">
						<label
							htmlFor="birthDate"
							className="text-md font-medium"
						>
							Ngày - tháng - năm sinh
						</label>
						<DatePicker
							onChange={(value) => onFormStateChange("birthDate", value)}
							value={formState.birthDate.toLocaleDateString("vi-VN")}
							dateFormat="dd/MM/yyyy"
							className="rounded-lg bg-gray-100 px-2 py-2"
						/>
					</div>
					<div className="flex flex-col mx-6">
						<label
							htmlFor="birthDate"
							className="text-md font-medium"
						>
							Giới tính
						</label>
						<select
							className="rounded-lg bg-gray-100 px-2 py-2"
							name="gender"
							value={formState.gender}
							onChange={(e) => {
								onFormStateChange("gender", e.target.value);
							}}
							id=""
						>
							<option value="male">Nam</option>
							<option value="female">Nữ</option>
							<option value="other">Khác</option>
						</select>
					</div>
					<div className="flex flex-col flex-1">
						<ImportantTextBox text="Số điện thoại" />
						<input
							type="text"
							name="phoneNumber"
							id=""
							className="rounded-lg bg-gray-100 px-2 py-2"
							placeholder="Số điện thoại ..."
							value={formState.phoneNumber}
							onChange={(e) => onFormStateChange("phoneNumber", e.target.value)}
						/>
					</div>
				</div>
				<h3 className="text-xl font-medium my-4">Chi tiết đăng nhập.</h3>

				<div className="flex flex-col">
					<ImportantTextBox
						text="Email"
						htmlFor="email"
					/>
					<input
						type="email"
						name="email"
						id=""
						className="rounded-lg bg-gray-100 px-2 py-2"
						value={formState.email}
						onChange={(e) => onFormStateChange("email", e.target.value)}
					/>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="email"
						className="text-md font-medium"
					>
						Password
					</label>
					<input
						type="password"
						name="password"
						placeholder="Password ..."
						id=""
						className="rounded-lg bg-gray-300 px-2 py-2"
						disabled
					/>
				</div>
			</form>
		</div>
	);
};

export default Information;
