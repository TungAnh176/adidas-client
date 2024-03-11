import React, { useState } from "react";
import Banner from "../components/Banner";
import { IoFilterOutline } from "react-icons/io5";
import BoxModel from "../components/BoxModel";
import Products from "../components/Product/Products";
import WhiteButton from "../components/Buttons/WhiteButton";
import { products } from "../constants/products";
const filters = [
	{
		title: "Sắp xếp",
		values: ["Mặc định", "Mới nhất", "Bán nhiều nhất", "Giá thấp nhất", "Giá cao nhất"],
	},
	{
		title: "Giá",
		values: ["Tất cả", "0-1.000.000 vnđ", "1.000.000 - 2.000.000 vnđ", "2.000.000 - 3.000.000 vnđ", "3.000.000 - 4.000.000 vnđ"],
	},
	{
		title: "Màu sắc",
		values: ["Đen", "Xanh nước biển", "Xám", "Trắng", "Đỏ"],
	},
	{
		title: "Loại giày",
		values: ["Gốc", "Giới hạn", "Thể thao"],
	},
	{
		title: "Sắp xếp",
		values: ["39"],
	},
];

const Home = () => {
	const [isOpenFilterBox, setIsOpenFilterBox] = useState(false);
	const handleFilter = () => {
		setIsOpenFilterBox(!isOpenFilterBox);
	};
	return (
		<div
			className="
			"
		>
			<Banner />
			{/* products */}
			<div className="px-[120px]">
				{/* title */}
				<div
					className="flex justify-between items-center  my-20"
					onClick={() => setIsOpenFilterBox(!isOpenFilterBox)}
				>
					<h1 className="text-3xl font-bold">Tổng quan sản phẩm</h1>
					<div className="rounded-md  border border-gray-300 text-gray-300 flex items-center p-4 cursor-pointer">
						<IoFilterOutline className="mr-3 text-2xl" />
						Filter
					</div>
				</div>
				{/* product cards */}
				<Products products={products} />
				<div className="w-[360px] mx-auto">
					<WhiteButton
						rounded="full"
						text="Xem thêm"
					/>
				</div>
			</div>
			{/* filter box */}
			{isOpenFilterBox && (
				<BoxModel
					isOpenModel={isOpenFilterBox}
					setIsOpenModel={setIsOpenFilterBox}
				>
					<div
						className="bg-white rounded-lg w-2/3 p-6"
						onClick={(e) => {
							e.preventDefault();
						}}
					>
						{/* filter items */}
						<div className="flex w-full  justify-between ">
							{filters.map((item, index) => (
								<div className="">
									<h1 className="font-semibold text-xl">{item.title}</h1>
									{item.values.map((value, index) => (
										<div
											className="flex"
											key={index}
										>
											<input
												type="radio"
												name="sortBy"
												id=""
												value={value}
											/>
											<label
												htmlFor="sortBy"
												className="ml-3"
											>
												{value}
											</label>
										</div>
									))}
								</div>
							))}
						</div>
						<div
							className="rounded border border-black px-6 py-2 w-fit cursor-pointer mt-3"
							onClick={handleFilter}
						>
							Lọc
						</div>
					</div>
				</BoxModel>
			)}
		</div>
	);
};

export default Home;
