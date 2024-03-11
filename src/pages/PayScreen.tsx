import React from "react";
import Banner from "../components/Banner";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import BoxModel from "../components/BoxModel";
import Contact from "../components/Layout/Contact";

function PayScreen() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center mb-5 mt-5">
        <h2 className="text-lg font-bold">Thanh toán</h2>
      </div>
      <div className="border rounded-md p-4">
        <h3 className="text-base font-bold">Chọn thông tin giao hàng</h3>
        <div className="flex flex-col mt-4">
          <label className="mb-2">Họ tên:</label>
          <input type="text" id="name" className="border rounded-md p-2" />
        </div>
        <div className="flex flex-col mt-4">
          <label className="mb-2">Địa chỉ:</label>
          <textarea id="address" className="border rounded-md p-2"></textarea>
        </div>
      </div>
      <div className="border rounded-md p-4">
        <h3 className="text-base font-bold">Sản phẩm</h3>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="text-left">Tên sản phẩm</th>
              <th className="text-right">Số lượng</th>
              <th className="text-right">Giá</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src="https://picsum.photos/200/200" alt="product image" />
              </td>
              <td className="text-right">2</td>
              <td className="text-right">₫8.000.000</td>
            </tr>
            <tr>
              <td>
                <img src="https://picsum.photos/200/200" alt="product image" />
              </td>
              <td className="text-right">1</td>
              <td className="text-right">₫4.000.000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 className="text-base font-bold">Các lựa chọn thanh toán</h3>
      <div className=" flex border rounded-md p-4 justify-around">
        <div className="flex flex-col mt-4 ">
          <label className="mb-2">Phương thức thanh toán:</label>
          <select id="payment-method" className="border rounded-md p-2">
            <option value="cod">Thanh toán khi đã nhận hàng (COD)</option>
            <option value="paypal">Thanh toán bằng paypal</option>
          </select>
        </div>
        <div className="flex flex-col mt-4">
          <label className="mb-2">Cách thức vận chuyển</label>
          <select id="payment-method" className="border rounded-md p-2">
            <option value="cod">
              Giao hàng nhanh <span>50.000đ</span>
            </option>
            <option value="paypal">
              Giao hàng tiết kiệm <span>30.000đ</span>
            </option>
          </select>
        </div>
        <div className="flex flex-col mt-4">
          <label className="mb-2">Mã giảm giá:</label>
          <input
            type="text"
            id="discount-code"
            className="border rounded-md p-2"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p>
          Tổng tiền hàng : <span>12.000.000đ</span>
        </p>
        <div>
          <p>
            Phí giao hàng : <span>0đ</span>
          </p>
          <p>
            Giam giá : <span>-0đ</span>
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-lg font-bold">Tổng thanh toán:</h3>
        <span className="text-lg font-bold">₫11.700.000</span>
      </div>
      <div className="flex justify-between">
        <div>
          <button className=" bg-black text-white hover:opacity-70 rounded-lg px-8 py-3 font-semibold mx-auto text-xl w-1/7 mb-4 cursor-pointer">
            Thanh toán
          </button>
        </div>
        <p>Nhấn "Đặt hàng" đồng nghĩa với việc bạn đã mua hàng</p>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default PayScreen;
