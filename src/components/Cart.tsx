import { useEffect, useState } from "react";
import { products } from "../constants/products";

const cart = {
  id: 1,
  products: [
    { product: products[0], quantity: 2 },
    { product: products[1], quantity: 3 },
    { product: products[0], quantity: 2 },
    { product: products[1], quantity: 3 },
    { product: products[0], quantity: 2 },
    { product: products[1], quantity: 3 },
    { product: products[0], quantity: 2 },
    { product: products[1], quantity: 3 },
  ],
};

function Cart() {
  const initQuantities = cart.products.map((item) => item.quantity);
  const [quantities, setQuantities] = useState<number[]>(initQuantities);
  const [isSelected, setIsSelected] = useState<boolean[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const total = cart.products.reduce(
    (acc, product, index) => acc + product.product.price * quantities[index],
    0
  );
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
      className="w-1/4 self-end bg-white h-fit min-h-screen overflow-y-auto p-5 transform transition-all duration-500 ease-in-out"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="">
        <h2 className="font-bold px-5 py-5" style={{ fontSize: "40px" }}>
          Giỏ hàng
        </h2>
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
          <label className="mx-2" htmlFor="">
            Chọn tất cả
          </label>
        </div>
        <div>
          <p className="font-bold">số lượng : {cart.products.length}</p>
        </div>
      </div>
      {cart.products.map((item, index) => (
        <div
          className="flex w-full justify-around items-center rounded-md mb-4"
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
              <label htmlFor="">Số lượng</label>
              <div className="flex items-center">
                <input
                  className="rounded-lg text-center bg-white py-2  w-full"
                  type="text"
                  value={quantities[index]}
                  disabled
                />
                <div
                  onClick={() => Increment(index)}
                  className="mx-2 cursor-pointer select-none p-2"
                >
                  +
                </div>
                <div
                  onClick={() => Decrement(index)}
                  className="mx-2 cursor-pointer select-none p-2"
                >
                  -
                </div>
              </div>
              <button className="border border-black rounded-lg px-6 py-1 mt-3">
                Xóa
              </button>
            </div>
          </div>
        </div>
      ))}
      <div>
        <p className="font-bold text-xl">
          Tổng tiền :{" "}
          <span>
            {total.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </p>
      </div>
      <div className="flex justify-around mt-3">
        <button className=" bg-white text-black hover:opacity-70 hover:bg-blue-200 rounded-lg px-8 py-3 font-semibold mx-auto text-xl border border-black  w-1/7 mb-4 cursor-pointer">
          Thanh toán
        </button>

        <button className=" bg-white text-black hover:opacity-70 hover:bg-red-200 rounded-lg px-8 py-3 font-semibold mx-auto text-xl border border-black  w-1/7 mb-4 cursor-pointer">
          Xóa
        </button>
      </div>
    </div>
  );
}

export default Cart;
