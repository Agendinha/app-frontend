import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";

function MainRouter() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Home Route */}
				<Route path="/" element={<Home />} />

				{/* Auth Routes */}
				<Route
					path="/login"
					element={
						<ProtectedRoute>
							<Login />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/register"
					element={
						<ProtectedRoute>
							<Register />
						</ProtectedRoute>
					}
				/>

				{/* App Routes */}
				<Route
					path="/dashboard"
					element={
						<AuthenticatedRoute>
							<Dashboard />
						</AuthenticatedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

function Home() {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("access_token");
		if (!token) {
			navigate("/login");
		} else {
			navigate("/dashboard");
		}
	}, [navigate]);

	return null;
}

function ProtectedRoute({ children }) {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("access_token");
		if (token) {
			navigate("/dashboard");
		}
	}, [navigate]);

	return children;
}

function AuthenticatedRoute({ children }) {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("access_token");
		if (!token) {
			navigate("/login");
		}
	}, [navigate]);

	return children;
}

export default MainRouter;
