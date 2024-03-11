import React from "react";
import Product from "./Product";

const Products = ({ data }: { data: any[] }) => {
    return (
        <div className="flex justify-between">
			<Product />
        </div>
    );
};

export default Products;
