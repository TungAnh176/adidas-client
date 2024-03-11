import React, { useState } from "react";
import { products } from "../constants/products";
import OrderStatus from "../components/OrderStatus";
import { Link } from "react-router-dom";

const cart = {
	id: 1,
	products: [
		{ product: products[0], quantity: 2 },
		{ product: products[1], quantity: 3 },
	],
};

const Follow = () => {
	const [status, setStatus] = useState([true, false, false]);
	const price = cart.products.reduce((total, item) => total + item.product.price * item.quantity, 0);
	const totalQuantity = cart.products.reduce((total, item) => total + item.quantity, 0);
	const saleOff = 10; // TODO: Implement a real sale system
	return (
		<div className="p-[120px]">
			<div className="flex">
				<h1 className="font-bold text-3xl mr-6">Theo dõi đơn hàng</h1>
				{/* status */}
				<div className="flex rounded-md bg-gray-200 font-semibold text-lg">
					<p
						onClick={() => setStatus([true, false, false])}
						className={`p-2 mx-3 cursor-pointer select-none ${status[0] ? "border-b-4 border-black" : ""}`}
					>
						Chờ xác nhận
					</p>
					<p
						onClick={() => setStatus([false, true, false])}
						className={`p-2 mx-3 cursor-pointer select-none ${status[1] ? "border-b-4 border-black" : ""}`}
					>
						Tiến độ giao hàng
					</p>
					<p
						onClick={() => setStatus([false, false, true])}
						className={`p-2 mx-3 cursor-pointer select-none ${status[2] ? "border-b-4 border-black" : ""}`}
					>
						Hoàn thành
					</p>
				</div>
			</div>
			{/* follow */}
			<div className="flex justify-between w-100">
				<p className="text-md">Đơn hàng:{cart.id}</p>
				{status[2] && (
					<Link
						to={"/completed"}
						className="text-blue-500 underline"
					>
						Chi tiết
					</Link>
				)}
			</div>
			<div className="border border-black rounded-md p-4 mt-6">
				<div className="grid grid-cols-2">
					{cart.products.map((product, index) => (
						<div
							key={index}
							className="flex justify-between items-start p-3"
						>
							<div className="flex w-1/2">
								<img
									src={product.product.images[0]}
									alt=""
									className="w-[100px] h-[100px] object-cover rounded-md shadow-lg"
								/>
								<div className="flex flex-col ml-4">
									<p className="font-bold text-2xl">{product.product.name}</p>
									<p className="text-gray-300">
										Kích cỡ: <b className="text-black"> {product.product.departments[0]}</b>
									</p>
									<p className="text-gray-300">
										Số lượng: <b className="text-black"> {product.quantity}</b>
									</p>
								</div>
							</div>
							<h1 className="text-xl font-bold">{(product.product.price * product.quantity).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</h1>
						</div>
					))}
				</div>

				<div className="flex justify-between border-t py-2">
					<h1 className="font-bold text-xl">Tổng thanh toán: {((price * (100 - saleOff)) / 100).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</h1>
					<p className="text-gray-300">
						Số lượng: <b className="text-black"> {totalQuantity}</b>
					</p>
				</div>
				{status[1] && (
					<div>
						<h3 className="text-md font-medium">Giai đoạn</h3>
						<OrderStatus />
					</div>
				)}
			</div>
		</div>
	);
};

export default Follow;
