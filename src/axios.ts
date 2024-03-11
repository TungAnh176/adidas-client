import axios from "axios";

export const makeRequest = axios.create({
	baseURL: "https://ec45-58-186-128-28.ngrok-free.app",
	withCredentials: true,
});
