import { useEffect, useState } from "react";
import { products } from "../constants/products";
import { Link } from "react-router-dom";

const cart = {
	id: 1,
	products: [
		{ product: products[0], quantity: 2 },
		{ product: products[1], quantity: 3 },
	],
};

function Favorite() {
	const initQuantities = cart.products.map((item) => item.quantity);
	const [quantities, setQuantities] = useState<number[]>(initQuantities);
	const [isSelected, setIsSelected] = useState<boolean[]>([]);
	const [isSelectAll, setIsSelectAll] = useState(false);
	const total = cart.products.reduce((acc, product, index) => acc + product.product.price * quantities[index], 0);
	const Increment = (index: number) => {
		let newQuantities = [...quantities];
		newQuantities[index] += 1;
		setQuantities(newQuantities);
	};
	const Decrement = (index: number) => {
		let newQuantities = [...quantities];
		newQuantities[index] -= 1;
		setQuantities(newQuantities);
	};
	useEffect(() => {
		let numItems = cart.products.length;
		for (let i = 0; i < numItems; i++) {
			setIsSelected((prev) => [...prev, false]);
			setQuantities((prev) => [...prev, 1]);
		}
	}, []);
	useEffect(() => {
		setIsSelected((prev) => prev.map(() => isSelectAll));
	}, [isSelectAll]);

	return (
		<div
			className="w-1/4 self-end bg-white h-fit min-h-screen overflow-y-auto py-2 px-1 transform transition-all duration-500 ease-in-out"
			onClick={(e) => e.stopPropagation()}
		>
			<div className="">
				<p className="font-bold">Danh sách yêu thích</p>
			</div>
			<div className="flex justify-between">
				<div>
					<input
						type="checkbox"
						className="mx-2"
						value={"all"}
						checked={isSelectAll}
						onChange={() => {
							const newIsSelectAll = !isSelectAll;
							setIsSelectAll(newIsSelectAll);
							setIsSelected((prev) => prev.map(() => newIsSelectAll));
						}}
					/>
					<label
						className="mx-2"
						htmlFor=""
					>
						Chọn tất cả
					</label>
				</div>
				<h3 className="font-medium text-medium">Số lượng: {cart.products.length}</h3>
			</div>
			{cart.products.map((item, index) => (
				<div
					className="flex w-full justify-around items-center bg-gray-200 rounded-md mb-4"
					key={index}
				>
					<div className="mx-3">
						<input
							type="checkbox"
							checked={isSelected[index]}
							onClick={() => {
								setIsSelected((prev) => {
									const newIsSelected = [...prev];
									newIsSelected[index] = !newIsSelected[index];
									return newIsSelected;
								});
							}}
						/>
					</div>
					<div className="w-1/2">
						<img
							src={item.product.images[0]}
							alt=""
							className="w-[200px] h-[200px] object-cover p-3"
						/>
					</div>
					<div className="w-1/2  ">
						<div>
							<p className="font-bold">{item.product.name}</p>
						</div>
						<div>
							<p>
								Price :{" "}
								<span>
									{item.product.price.toLocaleString("vi-VN", {
										style: "currency",
										currency: "VND",
									})}
								</span>
							</p>
						</div>
						<div className="flex flex-col">
							<Link to={"/detail/" + item.product.id}>
								<button className="border border-black rounded-lg px-6 py-1 mt-3">Xem chi tiết</button>
							</Link>
						</div>
					</div>
				</div>
			))}
			<div>
				<p className="font-bold text-xl">
					Tổng tiền : <span>{total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
				</p>
			</div>
			<div className="flex justify-around">
				<button className=" bg-white text-black hover:opacity-70 hover:bg-red-500 rounded-lg px-8 py-3 font-semibold mx-auto text-xl w-full mb-4 border border-black cursor-pointer">Xóa</button>
			</div>
		</div>
	);
}

export default Favorite;
