
import AuthWrapper from "./AuthWrapper";
import { Link } from 'react-router-dom';
import LoginForm from "./forms/LoginForm";

function Login() {
	return (
		<AuthWrapper>
			<h1 className="">Login</h1>
            <LoginForm />
			<Link to="/register">Não tem uma conta?</Link>
		</AuthWrapper>
	);
}

export default Login;
