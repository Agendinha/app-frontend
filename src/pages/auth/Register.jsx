
import AuthWrapper from "./AuthWrapper";
import { Link } from 'react-router-dom';
import RegisterForm from './forms/RegisterForm';

function Register() {
	return (
		<AuthWrapper>
			<h1>Registrar</h1>
            <RegisterForm />
			<Link to="/login">Já possui uma conta?</Link>
		</AuthWrapper>
	);
}

export default Register;
