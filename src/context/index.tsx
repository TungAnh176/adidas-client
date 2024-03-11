import { PropsWithChildren, createContext, useState } from "react";
import { EGender, User } from "../types/user";

type Context = {
	user: User;
	setUser: (user: User) => void;
	login: (formInput: any) => Promise<void>;
};
export const initialState: User = {
	id: 0,
	name: "Lokey",
	address: [
		{
			city: "HN",
			street: "Nguyễn Ngọc Vũ",
			building: "Tổ 2 Trung Hòa Cầu Giấy",
		},
	],
	birthDate: new Date(),
	email: "lokey@example.com",
	gender: EGender.MALE,
	phoneNumber: "0978129824",
	password: "",
};
export const UserContext = createContext<Context>({
	user: initialState,
	login: async (formInput) => {},
	setUser: (user) => {},
});

const UserContextProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<User>(initialState);
	const login = async (formInput: any) => {
		// const res = await makeRequest.post("/api/v1/auth/login", formInput, { withCredentials: true });
		// setUser(res.data);
		setUser({ ...user, ...formInput });
	};
	return <UserContext.Provider value={{ user, setUser, login }}>{children}</UserContext.Provider>;
};
export default UserContextProvider;
