import "./sidebar.css";
import PropTypes from "prop-types";

const Sidebar = ({ onCloseSidebar, isOpen }) => {
	return (
		<div className={`sidebar ${isOpen ? "open" : "closed"}`}>
			<div className="sidebar-header">
				<div className="profile-picture"></div>
				<div className="profile-info">
					<h2>Nome Sobrenome</h2>
					<p>Cliente | Parceiro</p>
				</div>
				<button className="close-sidebar" onClick={onCloseSidebar}>
					X
				</button>
			</div>
			<ul className="sidebar-menu">
				<li>
					<i className="fas fa-calendar-alt"></i> Minha agenda
				</li>
				<li>
					<i className="fas fa-briefcase"></i> Meus serviços
				</li>
				<li>
					<i className="fas fa-chevron-right"></i> Lorem ipsum
				</li>
			</ul>
			<div className="sidebar-footer">
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
