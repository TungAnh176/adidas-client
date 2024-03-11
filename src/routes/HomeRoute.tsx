import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Profile from "../pages/Profile";
import CartScreen from "../components/Cart";
import Follow from "../pages/Follow";
import Completed from "../pages/Completed";

const HomeRoute = () => {
	return (
		<Routes>
			<Route
				path="/*"
				element={<Home />}
				key="home"
			/>
			<Route
				path="/detail/:id"
				element={<Detail />}
				key="detail"
			/>
			<Route
				path="/profile/:id"
				element={<Profile />}
				key="profile"
			/>
			<Route
				path="/follow"
				element={<Follow />}
			/>
			<Route
				path="/completed"
				element={<Completed />}
			/>
		</Routes>
	);
};

export default HomeRoute;
