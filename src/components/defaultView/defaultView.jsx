import { useState } from "react";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import "./defaultView.css";
import PropTypes from "prop-types";

const DefaultView = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div className="default-view">
			<Navbar onToggleSidebar={toggleSidebar} />
			<Sidebar onCloseSidebar={toggleSidebar} isOpen={sidebarOpen} />
			<div
				className={`content-container ${sidebarOpen ? "shifted" : ""}`}
			>
				<div className="content-inner">{children}</div>
			</div>
		</div>
	);
};

DefaultView.propTypes = {
	children: PropTypes.node.isRequired,
};

export default DefaultView;
