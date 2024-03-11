import axios from "axios";

export const makeRequest = axios.create({
	baseURL: "https://6af9-42-112-192-229.ngrok-free.app/",
	withCredentials: true,
});
