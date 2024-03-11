import { AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../constants/products";
import { Comment } from "../types/product";
import { UserContext } from "../context";
import moment from "moment";

const Detail = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { user } = useContext(UserContext);
	const [bannerIndex, setBannerIndex] = useState(0);
	const [selectedItem, setSelectedItem] = useState(-1);
	const item = products.find((product) => product.id.toString() === id?.toString());
	const [rate, setRate] = useState(5);
	const [comments, setComments] = useState<Comment[]>(item?.comments || []);
	const [newCommentState, setNewCommentState] = useState({
		comment: "",
		title: "",
	});
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
			rate: rate,
			date: moment(Date.now()).format("DD/MM/YYYY"),
			commenter: user,
			...newCommentState,
		};
		setComments([...comments, newComment]);
		setNewCommentState({ comment: "", title: "" });
	};
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
	return item ? (
		<div className="px-[120px]">
			{/* product detail */}
			<div className="flex justify-between my-[100px]">
				<div className="flex w-1/2 items-start  ml-0">
					<div className="flex flex-col h-fit">
						{/* images */}
						{item?.images.map((img, index) => (
							<img
								key={index}
								src={img}
								alt="avatar"
								className="w-[80px] m-2 mt-0 h-[80px] object-cover rounded-md cursor-pointer hover:opacity-50"
								onClick={() => setBannerIndex(index)}
							/>
						))}
					</div>
					{/* banner image */}
					<img
						src={item?.images[bannerIndex]}
						alt="avatar"
						className="w-[360px] h-[360px] object-cover rounded-md"
					/>
				</div>
				<div className="w-1/2">
					<h1 className="text-3xl font-bold uppercase">{item?.name}</h1>
					<p className="text-xl">{item?.category}</p>
					<p className="text-lg">{item?.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
					<h3 className="text-xl font-semibold my-4">Chọn kích cỡ</h3>
					{/* sizes */}
					<div className="grid grid-cols-3 mb-4 w-full">
						{item?.departments.map((size, index) => (
							<div
								key={size}
								className={`border rounded-lg px-8 py-3 font-semibold mx-auto text-xl mb-4 cursor-pointer ${selectedItem === index && "border-black"} w-[90%] text-center`}
								onClick={() => setSelectedItem(index === selectedItem ? -1 : index)}
							>
								{size}
							</div>
						))}
					</div>
					{item.remain <= 0 && <button className="bg-red-500 text-white rounded-lg px-3 py-2 text-3xl mb-4">Hết hàng</button>}
					<button
						onClick={() => {
							if (item.remain <= 0) alert("Sản phẩm đã hết hàng");
							else navigate("/follow");
						}}
						className="bg-black text-white hover:opacity-70 rounded-full px-8 py-3 font-semibold mx-auto text-xl w-full mb-4 cursor-pointer"
					>
						Cho vào giỏ hàng
					</button>
					<button className="bg-white rounded-full px-8 py-3 font-semibold mx-auto text-xl border border-black w-full flex items-center justify-center cursor-pointer hover:bg-[#FFB6C1]">
						Yêu thích
						<AiOutlineHeart className="ml-2 text-2xl" />
					</button>
				</div>
			</div>
			{/* comments */}
			<div>
				<h1 className="text-3xl font-bold">Đánh giá sản phẩm</h1>
				{/* new comment box */}
				<div className="my-4">
					<div className="flex justify-between items-center">
						<h1 className="text-xl font-semibold">Số lượng đánh giá({comments.length})</h1>
					</div>
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
				{/* comments list */}
				<div className="border-t-2">
					{comments.map((comment, index) => (
						<div
							key={index}
							className="my-4"
						>
							<h1 className="text-xl font-semibold">{comment.commenter.name}</h1>
							<RatingStars stars={createStar(comment.rate)} />
							<div className="">
								<h1 className="font-semibold mt-2">{comment.title}</h1>
								<p>{comment.comment}</p>
								<p className="text-xl text-gray-400">{comment.date}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	) : (
		<h1 className="text-3xl font-bold">Không tìm thấy sản phẩm</h1>
	);
};

export default Detail;
