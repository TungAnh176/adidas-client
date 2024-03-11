import { useContext } from "react";
import { UserContext } from "../context";
import HomeRoute from "./HomeRoute";
import AuthRoute from "./AuthRoute";
import Layout from "../components/Layout";

const Root = () => {
	const { user } = useContext(UserContext);

	return <Layout>{user.password ? <HomeRoute /> : <AuthRoute />}</Layout>;
};

export default Root;
