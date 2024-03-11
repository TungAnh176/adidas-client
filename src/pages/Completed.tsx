import React, { useContext, useState } from "react";
import { products } from "../constants/products";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import moment from "moment";
import { Comment } from "../types/product";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const cart = {
	id: 1,
	products: [
		{ product: products[0], quantity: 2 },
		{ product: products[1], quantity: 3 },
	],
};

const Completed = () => {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	const price = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
	const discount = 30;
	const shipFee = 30000;
	const [comments, setComments] = useState(cart.products.reduce((acc, item) => [...acc, ...item.product.comments], [] as Comment[]));
	const [newCommentState, setNewCommentState] = useState({
		comment: "",
		title: "",
	});
	const createStar = (rate: number) => {
		const fullStar = Math.floor(rate);
		const emptyStar = Math.floor(5 - rate);

		const stars = new Array<any>(0);
		for (let i = 0; i < fullStar; i++) {
			stars.push(<AiFillStar />);
		}
		if (!Number.isInteger(rate)) stars.push(<BsStarHalf />);
		for (let i = 0; i < emptyStar; i++) stars.push(<AiOutlineStar />);
		return stars;
	};
	const RatingStars = ({ stars }: { stars: any[] }) => (
		<div className="flex items-center">
			{stars.map((star, index) => (
				<div
					key={index.toString()}
					className="mr-[2px]"
				>
					{star}
				</div>
			))}
		</div>
	);
	const onNewCommentStateChange = (event: any) => {
		setNewCommentState({ ...newCommentState, [event.target.name]: event.target.value });
	};
	const addComment = () => {
		if (!user.password) {
			alert("Bạn phải đăng nhập để bình luận");
			return;
		}
		if (!newCommentState.comment || !newCommentState.title) {
			alert("Vui lòng nhập đầy đủ thông tin");
			return;
		}
		const newComment: Comment = {
			date: moment(Date.now()).format("DD/MM/YYYY"),
			commenter: user,
			...newCommentState,
			rate: 5,
		};
		setComments([...comments, newComment]);
		setNewCommentState({ comment: "", title: "" });
	};
	return (
		<div className="p-[120px]">
			<div className="flex justify-between">
				<div className="flex flex-col text-lg">
					<div className="font-medium text-md">Đơn hàng: {cart.id}</div>
					<div className="text-green-500 text-2xl font-medium">Đơn hàng đã hoàn thành</div>
				</div>
				<button
					className="bg-black text-white px-8 py-4 rounded-xl"
					onClick={() => navigate(-1)}
				>
					Trở lại
				</button>
			</div>
			<div className="mt-6 rounded-lg bg-gray-200 flex justify-between items-center p-6 ">
				<p>Cảm ơn bạn đã mua sắm tại Adidas</p>
				<div className="flex">
					<button className="bg-transparent border border-black rounded-lg px-5 py-2 font-medium">Yêu cầu hóa đơn điện tử</button>
					<button className="bg-black text-white rounded-lg px-5 py-2 font-medium ml-4">Hỗ trợ trực tuyến</button>
				</div>
			</div>
			<h1 className="my-6 text-3xl font-bold">Địa chỉ nhận hàng</h1>
			{user.address.map((item, index) => (
				<div
					key={index}
					className="p-4 border border-black rounded-xl"
				>
					<p className="text-md font-medium">{user.name}</p>
					<p className="text-sm">{item.street}</p>
					<p className="text-md">{item.building}</p>
					<p className="text-md">{item.city}</p>
					<p>{user.phoneNumber}</p>
				</div>
			))}
			<h1 className="my-6 text-3xl font-bold">Sản phẩm</h1>
			{cart.products.map((product) => (
				<div className="flex justify-between p-4 items-center rounded-lg border border-black mb-4 shadow-md">
					<div className="flex items-center">
						<img
							src={product.product.images[0]}
							alt=""
							className="w-[80px] h-[80px] rounded-md mr-4"
						/>
						<div className="flex flex-col py-2">
							<div className="text-gray-300 font-medium">Tên sản phẩm</div>
							<div className="text-lg uppercase font-semibold">{product.product.name}</div>
						</div>
					</div>
					<div className="flex flex-col py-2">
						<div className="text-gray-300 font-medium">Đơn giá</div>
						<div className="text-lg uppercase font-semibold">{product.product.price.toLocaleString("vi-vn", { style: "currency", currency: "VND" })}</div>
					</div>
					<div className="flex flex-col py-2">
						<div className="text-gray-300 font-medium">Số lượng</div>
						<div className="text-lg uppercase font-semibold">{product.quantity}</div>
					</div>
					<div className="flex flex-col py-2">
						<div className="text-gray-300 font-medium">Thành tiền</div>
						<div className="text-lg uppercase font-semibold">{product.quantity * product.product.price}</div>
					</div>
				</div>
			))}
			<div className="mt-6 flex justify-between">
				<div className="">
					<p className="text-gray-300 font-medium flex text-xl">
						Tổng tiền hàng:
						<p className="font-bold text-black ml-4">{price.toLocaleString("vi-vn", { style: "currency", currency: "VND" })}</p>
					</p>
					<div className="text-gray-300 font-bold text-2xl flex ">
						Tổng thanh toán:
						<div className="text-black ml-4">{((price * (100 - discount)) / 100).toLocaleString("vi-vn", { style: "currency", currency: "VND" })}</div>
					</div>
				</div>
				<div className="">
					<p className="text-gray-300 font-medium flex text-xl">
						Phí vận chuyển
						<p className="font-bold text-black ml-4">{shipFee.toLocaleString("vi-vn", { style: "currency", currency: "VND" })}</p>
					</p>
					<div className="text-gray-300 font-bold text-xl flex ">
						Voucher giảm:
						<div className="text-black ml-4">{discount}%</div>
					</div>
				</div>
			</div>
			<div>
				<h1 className="text-3xl font-bold">Đánh giá dịch vụ giao hàng</h1>
				{/* new comment box */}
				<div className="my-4">
					<input
						type="text"
						placeholder="Tiêu đề"
						className="border-2 mb-4 px-2 py-3 rounded-lg resize-none w-full"
						name="title"
						value={newCommentState.title}
						onChange={onNewCommentStateChange}
					/>
					<textarea
						placeholder="Nội dung"
						name="comment"
						className="border-2 mb-4 px-2 py-8 rounded-lg resize-none w-full"
						value={newCommentState.comment}
						onChange={onNewCommentStateChange}
					/>
					<button
						onClick={addComment}
						className="bg-black text-white hover:opacity-70 rounded-lg px-8 py-3 font-semibold mx-auto text-xl w-fit mt-4"
					>
						Đánh giá
					</button>
				</div>
			</div>
			<div className="border-t">
				{comments.length > 0 ? (
					comments.map((comment) => (
						<div className="my-4">
							<h1 className="text-xl font-semibold">{comment.commenter.name}</h1>
							<RatingStars stars={createStar(comment.rate)} />
							<div className="">
								<h1 className="font-semibold mt-2">{comment.title}</h1>
								<p>{comment.comment}</p>
								<p className="text-xl text-gray-400">{comment.date}</p>
							</div>
						</div>
					))
				) : (
					<div className="my-4 text-gray-400 text-3xl font-bold text-center">Bạn chưa đánh giá dịch vụ sản phẩm.</div>
				)}
			</div>
		</div>
	);
};

export default Completed;
