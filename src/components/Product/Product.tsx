import React, { useState } from "react";
import { TProduct } from "../../types/product";
import { MdPriceChange } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Product = (props: TProduct) => {
	const [isHover, setIsHover] = useState(false);
	const navigate = useNavigate();
	return (
		<div
			className="mb-4 relative"
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<img
				src={props.images[0]}
				alt={`avatar of ${props.name}`}
				className={`w-[360px] h-[360px] object-cover rounded-md`}
			/>
			{isHover && (
				<div className="bg-black bg-opacity-50 flex items-end justify-center -mt-10 z-10 absolute top-[40px] left-0 w-full h-[360px] rounded-md ">
					<button
						onClick={() => {
							navigate(`/detail/${props.id}`);
						}}
						className="bg-white px-3 py-2 rounded-full relative cursor-pointer bottom-6"
					>
						Chi tiết
					</button>
				</div>
			)}
			<p className="text-lg font-semibold">{props.status}</p>
			<p className="font-bold text-lg uppercase">{props.name}</p>
			<p>
				{props.category} - {props.departments.length} màu
			</p>
			<p className="flex items-center">
				<MdPriceChange className="mr-2" />
				{props.price} đ
			</p>
		</div>
	);
};

export default Product;
