import React from "react";
import Address from "./Address";
import Information from "./Information";

const Forms = ({ isOpenAddressSection }: { isOpenAddressSection: boolean }) => {
	return isOpenAddressSection ? <Address /> : <Information />;
};

export default Forms;
