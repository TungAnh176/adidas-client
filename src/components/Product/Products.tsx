import React from "react";
import { TProduct } from "../../types/product";
import Product from "./Product";

const Products = ({ products }: { products: TProduct[] }) => {
	return (
		<div className="grid grid-cols-3 gap-4">
			{products.map((item, index) => (
				<Product
					{...item}
					key={index}
				/>
			))}
		</div>
	);
};

export default Products;
