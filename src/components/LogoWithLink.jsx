import { Link } from 'react-router-dom';
import logo from "../assets/images/logo.png";
import PropTypes from 'prop-types';

function Logo({ width }) {
    return (
        <Link to="/">
            <img src={logo} alt="Agendinha logo" width={width} />
        </Link>
    );
}

Logo.propTypes = {
    width: PropTypes.string,
};

export default Logo;
