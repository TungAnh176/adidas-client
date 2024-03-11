import { FaAngleRight } from "react-icons/fa";
import { useContext, useState } from "react";
import { UserContext, initialState } from "../context";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Forms from "../components/Forms";

const Profile = () => {
	const { id } = useParams();
	const { user, setUser } = useContext(UserContext);
	const [isOpenAddressSection, setIsOpenAddressSection] = useState(false);

	const isUser = user.id.toString() === id?.toString();
	const onSignOut = () => {
		setUser(initialState);
		window.location.href = "/";
	};
	const onDelete = () => {
		setUser(initialState);
		window.location.href = "/";
	};
	return isUser ? (
		<div className="px-[120px] m-[100px]">
			<h1 className="text-3xl font-bold mb-8">Thông tin tài khoản</h1>
			<div className="flex">
				{/* left side */}
				<div className="flex flex-col w-1/3">
					<div className="bg-gray-200 rounded-lg p-6 w-full">
						<div
							className="flex justify-between items-center cursor-pointer font-semibold mb-3"
							onClick={() => setIsOpenAddressSection(false)}
						>
							Thông tin cá nhân
							<FaAngleRight />
						</div>
						<div
							className="flex justify-between items-center cursor-pointer font-semibold"
							onClick={() => setIsOpenAddressSection(true)}
						>
							Sổ địa chỉ
							<FaAngleRight />
						</div>
					</div>
					<button
						className="bg-black text-white rounded-lg px-3 py-2 w-full text-center my-6"
						onClick={onSignOut}
					>
						Đăng xuất
					</button>
					<button
						className="bg-red-500 text-white rounded-lg px-3 py-2 w-full text-center my-6"
						onClick={onDelete}
					>
						Xóa tài khoản
					</button>
				</div>
				{/* right side */}
				<Forms isOpenAddressSection={isOpenAddressSection} />
			</div>
		</div>
	) : (
		<div className="px-[120px] m-[100px]">
			<h1 className="text-3xl font-bold mb-8">Bạn không thể chỉnh sửa thông tin của người này</h1>
		</div>
	);
};

export default Profile;
