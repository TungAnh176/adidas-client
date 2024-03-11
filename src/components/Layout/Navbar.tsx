import { RiSearch2Line } from "react-icons/ri";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import Categories from "./Categories";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context";
import BoxModel from "../BoxModel";
import Cart from "../Cart";
import Favorite from "../Favorite";
const categories = [
	{
		item: "Nam",
		subItems: ["Dòng sản phẩm original", "Bóng đá", "Chạy", "Tập luyện", "Ngoài trời", "Bóng rổ", "Quần vợt", "Giới hạn"],
	},
	{
		item: "Nữ",
		subItems: ["Dòng sản phẩm original", "Bóng đá", "Chạy", "Tập luyện", "Ngoài trời", "Bóng rổ", "Quần vợt", "Giới hạn"],
	},
	{
		item: "Trẻ em",
		subItems: ["Dòng sản phẩm original", "Bóng đá", "Chạy", "Tập luyện", "Ngoài trời", "Bóng rổ", "Quần vợt", "Giới hạn 2"],
	},
	{
		item: "Giảm giá",
		subItems: ["Dòng sản phẩm original", "Bóng đá", "Chạy", "Tập luyện", "Ngoài trời", "Bóng rổ", "Quần vợt", "Giới hạn"],
	},
	{
		item: "Sắp và mới ra mắt",
		subItems: ["Dòng sản phẩm original", "Bóng đá", "Chạy", "Tập luyện", "Ngoài trời", "Bóng rổ", "Quần vợt", "Giới hạn"],
	},
];

const Navbar = () => {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	const isLoggedIn = !!user.password;
	const defaultPage = "/login";
	const [models, setModels] = useState({
		search: false,
		cart: false,
		favorite: false,
	});
	const handleOpenModel = (name: string) => {
		setModels({
			...models,
			[name]: true,
		});
	};
	const handleCloseModel = (name: string) => {
		setModels({
			...models,
			[name]: false,
		});
	};
	return (
		<div className="flex items-center justify-between shadow-lg px-[120px]">
			{/* logo */}
			<Link to="/">
				<img
					src="https://cdn.icon-icons.com/icons2/2699/PNG/512/adidas_logo_icon_168690.png"
					alt="logo"
					className="w-[60px] h-[60px] cursor-pointer"
				/>
			</Link>
			{/* categories */}
			<div className="w-1/3 flex justify-between">
				{categories.map((category) => (
					<Categories
						{...category}
						key={category.item}
					/>
				))}
			</div>
			{/* models */}
			<div className="flex items-center justify-between w-1/6">
				<RiSearch2Line
					className="text-2xl cursor-pointer"
					onClick={() => handleOpenModel("search")}
				/>
				{/* search model */}
				<BoxModel
					isOpenModel={models.search}
					setIsOpenModel={(value: boolean) =>
						setModels({
							...models,
							search: value,
						})
					}
				>
					<div
						className="flex w-1/2 bg-white rounded-full items-center px-2 py-4"
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						<input
							type="text"
							className="outline-none h-full w-full"
							autoFocus
						/>
						<RiSearch2Line className="text-2xl text-gray-400" />
					</div>
				</BoxModel>
				<FaRegUser
					className="text-2xl cursor-pointer"
					onClick={() => navigate(isLoggedIn ? `/profile/${user.id}` : defaultPage)}
				/>
				<FaRegHeart
					className="text-2xl cursor-pointer"
					onClick={() => {
						handleOpenModel("favorite");
					}}
				/>
				<MdOutlineShoppingCart
					className="text-2xl cursor-pointer"
					onClick={() => {
						handleOpenModel("cart");
					}}
				/>
			</div>
			<div
				className={`bg-[rgba(0,0,0,0.1)]  z-50 fixed top-0 right-0 left-0 bottom-0 flex flex-col ${!models.cart && "hidden"} cursor-default`}
				onClick={() => handleCloseModel("cart")}
			>
				<Cart />
			</div>
			<div
				className={`bg-[rgba(0,0,0,0.1)]  z-50 fixed top-0 right-0 left-0 bottom-0 flex flex-col ${!models.favorite && "hidden"} cursor-default`}
				onClick={() => handleCloseModel("favorite")}
			>
				<Favorite />
			</div>
		</div>
	);
};

export default Navbar;
