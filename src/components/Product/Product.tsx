import React, { useState, useEffect } from "react";
import { MdPriceChange } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import productsAPI from "../../apis/products.js";

const Product = () => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productsAPI.getAllProducts();
        if (response && response.products) {
          setData(response.products);
        }
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();

  }, []);

  return (
    <>
      {data.map((product: any, index: number) => (
        <div
          key={index}
          className="mb-4 relative"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(-1)}
        >
          {product.PhotoLink && (
            <img
              src={product.PhotoLink}
              alt={`avatar of ${product.ProductName}`}
              className={`w-[360px] h-[360px] object-cover rounded-md`}
            />
          )}
          {hoveredIndex === index && (
            <div className="bg-black bg-opacity-50 flex items-end justify-center -mt-10 z-10 absolute top-[40px] left-0 w-full h-[360px] rounded-md ">
              <button
                onClick={() => {
                  navigate(`/detail/${product.id}`);
                }}
                className="bg-white px-3 py-2 rounded-full relative cursor-pointer bottom-6"
              >
                Chi tiết
              </button>
            </div>
          )}
          <p className="text-lg font-semibold">{product.status}</p>
          <p className="font-bold text-lg uppercase">{product.ProductName}</p>
          <p>
            {product.Category} - {product.Size.split(", ").length} màu
          </p>
          <p style={{"display": "flex", "alignItems": "center"}}>
            <MdPriceChange className="mr-2" />
            {product.Price} đ
          </p>
        </div>
      ))}
    </>
  );
};

export default Product;
