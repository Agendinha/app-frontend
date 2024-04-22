import PropTypes from "prop-types";
import Logo from "../../components/Logo";
import { Card, CardContent } from "@/components/ui/card";

function AuthWrapper({ children }) {
	return (
		<div className="flex flex-col items-center gap-4">
			<Logo width="300" />
			<Card className="bg-[#aaa] w-full max-w-lg p-4 rounded-xl shadow-md">
				<CardContent>{children}</CardContent>
			</Card>
		</div>
	);
}
AuthWrapper.propTypes = {
	children: PropTypes.node,
};

export default AuthWrapper;
