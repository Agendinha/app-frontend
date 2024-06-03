import "./navbar.css";
import PropTypes from "prop-types";
import icon from "../../assets/images/icon.png";

const Navbar = ({ onToggleSidebar }) => {
	return (
		<div className="navbar">
			<div className="navbar-left">
				<i className="fas fa-bars" onClick={onToggleSidebar}></i>
			</div>
			<div className="navbar-right">
				<div className="navbar-item">Contato</div>
				<div className="navbar-item">Sobre nós</div>
				<div className="navbar-icon">
					<img src={icon} alt="Icon" className="navbar-image" />
				</div>
			</div>
		</div>
	);
};

Navbar.propTypes = {
	onToggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;
