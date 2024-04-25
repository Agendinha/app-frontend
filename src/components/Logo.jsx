import logo from "../assets/images/logo.png";
import PropTypes from "prop-types";

function Logo({ width }) {
	return (
		<>
			<img src={logo} alt="Agendinha logo" width={width} />
		</>
	);
}

Logo.propTypes = {
	width: PropTypes.string,
};

export default Logo;
