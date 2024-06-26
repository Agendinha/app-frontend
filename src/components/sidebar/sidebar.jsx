import "./sidebar.css";
import PropTypes from "prop-types";

const logout = () => {
	localStorage.removeItem("access_token");
	localStorage.removeItem("userId");
	localStorage.removeItem("usertype");
	localStorage.removeItem("username");
	localStorage.removeItem("userEmail");
	window.location.href = "/login";
};

const Sidebar = ({ onCloseSidebar, isOpen }) => {
	const usertype = localStorage.getItem("usertype");
	const userType = usertype === "cliente" ? "Cliente" : "Parceiro";
	const username = localStorage.getItem("username");
	return (
		<div className={`sidebar ${isOpen ? "open" : "closed"}`}>
			<div className="sidebar-header">
				<div className="profile-picture"></div>
				<div className="profile-info">
					<h2>{username}</h2>
					<p>{userType}</p>
				</div>
				<button className="close-sidebar" onClick={onCloseSidebar}>
					X
				</button>
			</div>
			<ul className="sidebar-menu">
				<li>
					<i className="fas fa-calendar-alt"></i> Lorem ipsum
				</li>
				<li>
					<i className="fas fa-briefcase"></i> Lorem ipsum
				</li>
				<li>
					<i className="fas fa-chevron-right"></i> Lorem ipsum
				</li>
			</ul>
			<div className="sidebar-footer" onClick={logout} style={{ cursor: "pointer" }}>
				<i className="fas fa-sign-out-alt"></i> Logout
			</div>
			<div className="sidebar-copyright">
				Copyright © Agendinha. Todos os direitos reservados.
			</div>
		</div>
	);
};

Sidebar.propTypes = {
	onCloseSidebar: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
